import { useEffect, useState } from 'react'
import useAppStore from '../store/store'
import { loadFile } from '../logic/loader'
import { sanitizeUrl } from '../helpers'

const api = window.api

function InputFolders(): JSX.Element {
  const { inputDir, setInputDir, filesList, setFilesList, setSelectedFileMaterials } = useAppStore()
  const [selectedFile, setSelectedFile] = useState<string>()

  useEffect(() => {
    if (inputDir) {
      api.getFilesInDirectory(sanitizeUrl(inputDir)).then((files: string[]) => {
        setFilesList(files)
      })
    }
  }, [inputDir])
  const handleSelectFolder = (): void => {
    api.selectFolder().then((result: string) => {
      setInputDir(sanitizeUrl(result))
    })
  }

  const handleSelectFile = (fileName: string): void => {
    if (inputDir) {
      const sel_materials: string[] = []
      setSelectedFile(fileName)
      const filePath = sanitizeUrl(inputDir) + '\\' + fileName
      api.getFileData(filePath).then((result: string) => {
        const fileData = 'data:model/gltf-binary;base64,' + result
        loadFile(fileData, fileName).then(() => {
          window.scene.materials.map((m) => {
            sel_materials.push(m.name)
          })
          setSelectedFileMaterials(sel_materials)
        })
      })
    }
  }
  return (
    <ul className={'w-full '}>
      <li
        className={'flex justify-between accent cursor-pointer my undeline w-full px-1'}
        onClick={handleSelectFolder}
      >
        <span>Select Input Folder</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-folder-plus"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            <line x1="12" y1="11" x2="12" y2="17"></line>
            <line x1="9" y1="14" x2="15" y2="14"></line>
          </svg>
        </span>
      </li>
      <li className={'my'}>
        <p className={'text-sm text-muted'}>Path:</p>
        <p className={'px-1 path'}>{sanitizeUrl(inputDir)}</p>
      </li>
      <li>
        <p className={'text-sm text-muted'}>Files:</p>
        <ul className={'pl-1 my list'}>
          {filesList.map((file, index) => (
            <li
              onClick={() => handleSelectFile(file)}
              className={`fileName ${selectedFile === file ? 'selected' : ''}`}
              key={file + index}
            >
              {file}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}

export default InputFolders
