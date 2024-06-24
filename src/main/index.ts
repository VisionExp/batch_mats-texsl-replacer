import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as fs from 'fs'

let mainWindow: BrowserWindow | null = null

function createWindow(): BrowserWindow {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
    // mainWindow?.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.handle(
    'getFilesInDirectory',
    async (_event: Electron.IpcMainInvokeEvent, path: string) => {
      return fs.readdirSync(path)
    }
  )
  ipcMain.handle('getFileData', async (_event: Electron.IpcMainInvokeEvent, path: string) => {
    return fs.readFileSync(path).toString('base64')
  })
  ipcMain.handle('dialog:openDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow || createWindow(), {
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  })
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow || createWindow(), {
      properties: ['openFile']
    })
    if (canceled) {
      return
    } else {
      const base64 = fs.readFileSync(filePaths[0]).toString('base64')
      return {
        path: filePaths[0],
        data: base64
      }
    }
  })
  ipcMain.handle(
    'writeFile',
    async (
      _event: Electron.IpcMainInvokeEvent,
      data: {
        path: string
        name: string
        base64: string
      }
    ) => {
      fs.writeFile(join(data.path, data.name), data.base64, { encoding: 'base64' }, function () {
        console.log(`File ${data.name} created`)
      })
    }
  )
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
