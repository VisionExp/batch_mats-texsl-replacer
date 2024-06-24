import { useEffect, useRef, useState } from 'react'
import { createScene3d } from '../logic/scene3d'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import useAppStore from '../store/store'
import ReplaceTextures from './ReplaceTextures'

function RenderCanvas() {
  const { progress, isProcessing } = useAppStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const needsSetup = useRef(true)
  const [isTextureReplacerOpen, setIsTextureReplacerOpen] = useState(false)
  useEffect(() => {
    if (needsSetup.current) {
      needsSetup.current = false
      const canvas = canvasRef.current

      if (!canvas) {
        console.warn('canvas undefined')
        return
      }
      createScene3d(canvas)
    }
  }, [])
  const {
    setIntroWatched,
    setFromMaterial,
    setToMaterial,
    setMaterialPairs,
    filesList,
    outputDir,
    setInputDir,
    setOutputDir,
    setReferenceFile,
    setFilesList,
    setSelectedFileMaterials,
    setTexturesSource
  } = useAppStore()
  const clearCache = () => {
    window.localStorage.clear()
    setInputDir('')
    setOutputDir('')
    setFromMaterial('')
    setToMaterial('')
    setMaterialPairs([])
    setFilesList([])
    setReferenceFile('')
    setIntroWatched(false)
    setTexturesSource('')
  }
  const handleOpenTextureReplacer = () => {
    setSelectedFileMaterials([])
    setIsTextureReplacerOpen(true)
  }
  return (
    <div>
      {isProcessing && (
        <div className={'progressContainer'}>
          <CircularProgressbar
            className={'progressCircle'}
            value={progress}
            text={`${progress}%`}
            strokeWidth={5}
          />
        </div>
      )}
      <div className={'header'}>
        <div className={'flex gap-2 items-center'}>
          {filesList.length > 0 && outputDir && (
            <div onClick={handleOpenTextureReplacer} className={'textures-btn'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
              </svg>
            </div>
          )}
          <div onClick={clearCache} className={'clear-btn'}>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M837.818182 915.549091h-131.956364c-12.8 0-23.272727-10.472727-23.272727-23.272727v-58.181819c0-4.189091-8.843636-11.636364-23.272727-11.636363s-23.272727 7.447273-23.272728 11.636363v58.181819c0 12.8-10.472727 23.272727-23.272727 23.272727H465.454545c-12.8 0-23.272727-10.472727-23.272727-23.272727s10.472727-23.272727 23.272727-23.272728h124.043637v-34.909091c0-32.581818 30.72-58.181818 69.818182-58.181818s69.818182 25.6 69.818181 58.181818v34.909091H814.545455v-232.727272H209.454545v232.727272h93.789091c12.8 0 23.272727 10.472727 23.272728 23.272728s-10.472727 23.272727-23.272728 23.272727H186.181818c-12.8 0-23.272727-10.472727-23.272727-23.272727v-279.272728c0-12.8 10.472727-23.272727 23.272727-23.272727h651.636364c12.8 0 23.272727 10.472727 23.272727 23.272727v279.272728c0 12.8-10.472727 23.272727-23.272727 23.272727z"
                fill="#ffffff"
              />
              <path
                d="M837.818182 636.276364H186.181818c-12.8 0-23.272727-10.472727-23.272727-23.272728v-69.818181c0-11.403636 8.145455-20.945455 19.316364-22.807273l244.596363-43.054546V124.276364c0-26.065455 23.970909-46.545455 54.225455-46.545455h62.138182c30.487273 0 54.225455 20.48 54.225454 46.545455V477.090909l244.596364 43.054546c11.170909 1.861818 19.316364 11.636364 19.316363 22.807272v69.818182A23.738182 23.738182 0 0 1 837.818182 636.276364z m-628.363637-46.545455h605.09091v-26.996364l-244.596364-43.054545a23.202909 23.202909 0 0 1-19.316364-22.807273V126.138182a13.172364 13.172364 0 0 0-7.68-2.094546h-62.138182c-3.723636 0-6.516364 1.163636-7.68 2.094546v370.269091c0 11.403636-8.145455 20.945455-19.316363 22.807272L209.454545 562.734545v26.996364z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>
        <div onClick={() => setIntroWatched(false)} className={'help-btn'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            fill="currentColor"
            className="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </div>
      </div>
      <span id={'materialName'}></span>
      <canvas ref={canvasRef} id="render-canvas"></canvas>
      {isTextureReplacerOpen && <ReplaceTextures onClose={() => setIsTextureReplacerOpen(false)} />}
    </div>
  )
}

export default RenderCanvas
