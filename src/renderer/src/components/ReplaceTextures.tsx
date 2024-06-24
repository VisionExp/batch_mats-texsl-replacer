import useAppStore from '../store/store'
import { sanitizeUrl, textureTypes } from '../helpers'
import Stepper from 'awesome-react-stepper'
import { processFiles } from '../logic/processFiles'

const api = window.api

interface ReplaceTexturesProps {
  onClose: () => void
}

function ReplaceTextures(props: ReplaceTexturesProps) {
  const { onClose } = props
  const {
    materialToTextureReplacement,
    textureName,
    textureType,
    texturesSource,
    setMaterialToTextureReplacement,
    setTextureName,
    setTextureType,
    setTexturesSource
  } = useAppStore()
  const handleSetMaterial = (evt: { target: { value: string } }) => {
    setMaterialToTextureReplacement(evt.target.value)
  }
  const handleSetTextureType = (evt: { target: { value: string } }) => {
    setTextureType(evt.target.value)
  }
  const handleSetTextureName = (evt: { target: { value: string } }) => {
    setTextureName(evt.target.value)
  }
  const handleSetTexturesSource = () => {
    api.selectFolder().then((result: string) => {
      setTexturesSource(sanitizeUrl(result))
    })
  }
  const handleCallback = () => {
    processFiles(false).then(() => {
      onClose()
    })
  }
  return (
    <div className={'wizard-backdrop'}>
      <div className={'welcome-wizard'}>
        <div className="wizard-header">
          <h3>Material Texture Replacer</h3>
          <span className={'cursor-pointer'} onClick={() => onClose()}>
            X
          </span>
        </div>
        <Stepper
          strokeColor="#172539"
          fillStroke="#172539"
          activeColor="#172539"
          contentBoxClassName={'stepper-content'}
          activeProgressBorder="1px solid #172539"
          submitBtn={<button className="done-btn stepper-btn">Start</button>}
          continueBtn={<button className="next-btn stepper-btn">Next</button>}
          backBtn={<button className="prev-btn stepper-btn">Back</button>}
          onSubmit={handleCallback}
        >
          <div className={'stepContent'}>
            <ul className={'m-auto'}>
              <li className={'my'}>1. Select Textures Source Folder</li>
              <li
                className={'flex justify-between accent cursor-pointer my undeline w-full'}
                onClick={handleSetTexturesSource}
              >
                <span>Source Folder</span>
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
                <p className={'text-sm text-muted'}>Selected Path:</p>
                <p className={'px-1 path'}>{sanitizeUrl(texturesSource)}</p>
              </li>
            </ul>
          </div>
          <div className={'stepContent'}>
            <ul className={'m-auto'}>
              <li className={'my'}>2. Select Material Needs Texture Replacement</li>
              <li className={'my-1 flex flex-col gap-2'}>
                <div className={'wrapper my-1'}>
                  <input
                    className={'inputUnderline'}
                    value={materialToTextureReplacement}
                    onChange={(e) => handleSetMaterial(e)}
                    type="text"
                    placeholder={'Replaced Material Name'}
                  />
                  <span className={'line'}></span>
                </div>
              </li>
            </ul>
          </div>
          <div className={'stepContent'}>
            <ul className={'m-auto'}>
              <li className={'my'}>3. Select Texture Type In Material</li>
              <li className={'my-1 flex flex-col gap-2'}>
                <div className={'wrapper my-1'}>
                  <input
                    className={'inputUnderline'}
                    value={textureType}
                    onChange={(e) => handleSetTextureType(e)}
                    type="text"
                    list="texture-type"
                    placeholder={'Texture Type'}
                  />
                  <datalist id="texture-type">
                    {textureTypes.map((textureType, idx) => (
                      <option key={textureType + idx} value={textureType} />
                    ))}
                  </datalist>
                </div>
              </li>
            </ul>
          </div>
          <div className="stepContent">
            <ul className={'m-auto'}>
              <li className={'my'}>4. Select Name That Texture File Includes</li>
              <li className={'my-1 flex flex-col gap-2'}>
                <div className={'wrapper my-1'}>
                  <input
                    className={'inputUnderline'}
                    value={textureName}
                    onChange={(e) => handleSetTextureName(e)}
                    type="text"
                    placeholder={'Texture Includes Name'}
                  />
                  <span className={'line'}></span>
                </div>
              </li>
            </ul>
          </div>
        </Stepper>
      </div>
    </div>
  )
}

export default ReplaceTextures
