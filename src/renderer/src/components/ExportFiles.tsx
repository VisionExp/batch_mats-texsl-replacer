import { sanitizeUrl } from '../helpers'
import useAppStore from '../store/store'
import { processFiles } from '../logic/processFiles'
import { useState } from 'react'

const api = window.api

function ExportFiles() {
  const { outputDir, setOutputDir, setIsProcessing } = useAppStore()
  const [isDisabled, setIsDisabled] = useState(!outputDir)

  const handleSelectFolder = (): void => {
    api.selectFolder().then((result: string) => {
      setOutputDir(result)
      setIsDisabled(false)
    })
  }
  const handleExportFiles = () => {
    if (!isDisabled) {
      setIsProcessing(true)
      setIsDisabled(true)
      processFiles(true).then(() => {
        setIsDisabled(false)
      })
    }
  }
  return (
    <ul className={'w-full h-full flex flex-col justify-between'}>
      <li
        className={'flex justify-between accent cursor-pointer my undeline w-full px-1'}
        onClick={handleSelectFolder}
      >
        <span>Select Output Folder</span>
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
        <p className={'px-1 path'}>{sanitizeUrl(outputDir)}</p>
      </li>
      <li className={'w-full flex justify-center'}>
        <button
          onClick={handleExportFiles}
          className={`gradient-border-button ${isDisabled ? 'disabled' : ''}`}
        >
          Export Files
        </button>
      </li>
    </ul>
  )
}

export default ExportFiles
