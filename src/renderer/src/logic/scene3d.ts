import {
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  PointerEventTypes,
  Scene,
  Vector3
} from '@babylonjs/core'

export function createScene3d(canvas: HTMLCanvasElement): void {
  const engine = new Engine(canvas)
  const scene = new Scene(engine)
  const sceneMaterials = new Scene(engine)
  scene.clearColor = new Color4(0.0, 0.0, 0.0, 0.0)
  sceneMaterials.autoClear = false

  const camera = new ArcRotateCamera('Camera', 1.13, Math.PI / 2.3, 9, new Vector3(0, 0, 0), scene)
  camera.lowerRadiusLimit = 7
  camera.upperRadiusLimit = 15
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
  light.intensity = 0.7

  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN: {
        const pickedMesh = pointerInfo?.pickInfo?.pickedMesh
        const msg = document.getElementById('materialName')
        if (msg) {
          if (pickedMesh) {
            msg.style.display = 'block'
          } else {
            msg.style.display = 'none'
          }
          msg.innerHTML = `material name: <br> ${pickedMesh?.material?.name || ''}`
          msg.style.left = pointerInfo.event.clientX + 'px'
          msg.style.top = pointerInfo.event.clientY + 'px'
          setTimeout(() => {
            msg.style.display = 'none'
          }, 10000)
        }

        break
      }
    }
  })

  window.addEventListener('resize', () => {
    engine.resize()
  })
  //scene.debugLayer.show()
  window.scene = scene
  window.sceneMaterials = sceneMaterials
  engine.runRenderLoop(() => {
    scene.render()
  })
}
