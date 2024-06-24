import { SceneLoader } from '@babylonjs/core'
import '@babylonjs/loaders'

export async function loadFile(data: string, name: string) {
  const sceneObj = window.scene
  if (sceneObj) {
    while (sceneObj.meshes.length) {
      const mesh = sceneObj.meshes[0]
      mesh.dispose()
    }
    while (sceneObj.materials.length) {
      const material = sceneObj.materials[0]
      material.dispose()
    }
    sceneObj.metadata = { name: name }
    return SceneLoader.AppendAsync('', data, sceneObj)
  } else {
    return null
  }
}

export function loadMaterials(data: string, callback?: () => void) {
  const sceneMaterials = window.sceneMaterials
  if (sceneMaterials) {
    SceneLoader.Append('', data, sceneMaterials, callback)
  }
}
