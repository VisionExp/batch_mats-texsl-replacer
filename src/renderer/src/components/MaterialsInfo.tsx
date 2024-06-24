import { sanitizeUrl } from '../helpers'
import useAppStore from '../store/store'
import { loadMaterials } from '../logic/loader'

const api = window.api

function MaterialsInfo() {
  const { referenceFile, setReferenceFile, materialsList, setMaterialsList } = useAppStore()

  const handleSelectReference = async () => {
    const file = await api.selectFile()
    const base64 = 'data:model/gltf-binary;base64,' + file.data
    loadMaterials(base64, () => {
      const materials: string[] = []
      window.sceneMaterials.materials.map((m) => {
        materials.push(m.name)
      })
      setMaterialsList(materials)
    })
    setReferenceFile(sanitizeUrl(file.path))
  }
  const handleReload = async () => {
    const file = await api.getFileData(referenceFile)
    const base64 = 'data:model/gltf-binary;base64,' + file
    loadMaterials(base64)
  }
  return (
    <ul className={'w-full '}>
      <li className={'my-1 accent flex justify-between cursor-pointer undeline w-full px-1'}>
        <p onClick={handleSelectReference} className={'flex items-center gap-2 border-r pr-1'}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-file-plus"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </span>
          <span>Select Mat. Reference</span>
        </p>
        {referenceFile && (
          <p onClick={handleReload} className={'cursor-pointer flex items-center gap-2'}>
            <span>Reload</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-bootstrap-reboot"
              viewBox="0 0 16 16"
            >
              <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z" />
              <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z" />
            </svg>
          </p>
        )}
      </li>
      <li className={'my'}>
        <p className={'text-sm text-muted'}>File Path:</p>
        <p className={'px-1 path'}>{sanitizeUrl(referenceFile)}</p>
      </li>
      <li className={'my-1'}>
        <p className={'text-sm text-muted'}>Materials List:</p>
        <ul className={'pl-1 my list'}>
          {materialsList &&
            materialsList.map((material, idx) => <li key={material + idx}>{material}</li>)}
        </ul>
      </li>
    </ul>
  )
}

export default MaterialsInfo
