import { useState } from 'react'
import InputFolders from './InputFolders'
import MaterialsSetup from './MaterialsSetup'
import ExportFiles from './ExportFiles'
import MaterialsInfo from './MaterialsInfo'
import useAppStore from '../store/store'
import { Color3 } from '@babylonjs/core'

declare global {
  interface Window {
    api: any
  }
}

function Sidebar(): JSX.Element {
  const { selectedFileMaterials } = useAppStore()
  const [tabState, setTabState] = useState<number>(1)
  const [activeEl, setActiveEl] = useState<string>('')
  const toggleTab = (index: number): void => {
    setTabState(index)
  }
  const highlightMaterial = (matName: string) => {
    const currMat = window.scene.getMaterialById(matName)
    if (currMat) {
      currMat.albedoColor = Color3.Red()
      setActiveEl(matName)
    }
  }
  return (
    <aside className="sidebar w-full">
      {selectedFileMaterials && selectedFileMaterials.length > 0 && (
        <div className={'materials-side'}>
          <ul>
            {selectedFileMaterials.map((material, index) => (
              <li
                onClick={() => highlightMaterial(material)}
                key={material + index}
                className={`fileName ${activeEl === material ? 'text-red' : ''}`}
              >
                {material}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={'main-side'}>
        <ul className={'tabs'}>
          <li onClick={() => toggleTab(1)} className={`tab ${tabState === 1 ? 'active' : ''}`}>
            Inputs
          </li>
          <li onClick={() => toggleTab(2)} className={`tab ${tabState === 2 ? 'active' : ''}`}>
            Mat. Info
          </li>
          <li onClick={() => toggleTab(3)} className={`tab ${tabState === 3 ? 'active' : ''}`}>
            Mat. Pairs
          </li>
          <li onClick={() => toggleTab(4)} className={`tab ${tabState === 4 ? 'active' : ''}`}>
            Export
          </li>
        </ul>
        <div className={'tabs-content'}>{tabState === 1 && <InputFolders />}</div>
        <div className={'tabs-content'}>{tabState === 2 && <MaterialsInfo />}</div>
        <div className={'tabs-content'}>{tabState === 3 && <MaterialsSetup />}</div>
        <div className={'tabs-content'}>{tabState === 4 && <ExportFiles />}</div>
      </div>
    </aside>
  )
}

export default Sidebar
