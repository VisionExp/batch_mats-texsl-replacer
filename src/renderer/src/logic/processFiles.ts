import useAppStore from '../store/store'
import { sanitizeUrl } from '../helpers'
import { loadFile } from './loader'
import { GLTF2Export } from '@babylonjs/serializers'
import { Texture } from '@babylonjs/core'

export async function processFiles(materials: boolean) {
  const { filesList, inputDir, outputDir, setProgress, setIsProcessing } = useAppStore.getState()
  const engine = window.scene.getEngine()
  engine.stopRenderLoop()
  if (filesList) {
    const totalCount = filesList.length
    let processedFile = 0
    for (const file of filesList) {
      const path = sanitizeUrl(inputDir) + '\\' + file
      const base64 = await window.api.getFileData(path)
      const fileData = 'data:model/gltf-binary;base64,' + base64
      await loadFile(fileData, file)
      if (materials) {
        await replaceMaterials()
      } else {
        await replaceTexture(file)
      }
      await exportSceneFile(file, outputDir)
      processedFile++
      const percent = (processedFile * 100) / totalCount
      setProgress(percent)
      if (percent === 100) {
        setIsProcessing(false)
      }
    }
  }
}

async function replaceMaterials() {
  const { materialsPairs } = useAppStore.getState()
  materialsPairs.map((pair) => {
    replaceMaterial(pair.from, pair.to)
  })
}

function replaceMaterial(fromMat: string, toMat: string) {
  const scene = window.scene
  const sceneMaterials = window.sceneMaterials
  const toMaterial = sceneMaterials.getMaterialById(toMat)
  const meshes = scene.meshes
  const meshWithMat = meshes.filter((mesh) => {
    if (mesh && mesh.material) {
      return mesh.material.name === fromMat
    } else {
      return false
    }
  })

  meshWithMat.map((mesh) => {
    mesh.material = toMaterial
    if (mesh.material) {
      mesh.material.name = fromMat
    }
  })
}

async function replaceTexture(meshName: string) {
  const { materialToTextureReplacement, textureType, texturesSource, textureName } =
    useAppStore.getState()
  const scene = window.scene
  let material = scene.getMaterialById(materialToTextureReplacement)
  const name = `${meshName.split('.')[0]}#${textureName}`
  const textureFile = await findAndGetFileInFolder(texturesSource, name)
  const texture = new Texture(textureFile, scene)
  if (material) {
    material[textureType] = texture
  } else {
    material = scene.materials.find((m) => m.name.includes(textureName))
    material[textureType] = texture
  }
  console.log(material)
}

const blobToBase64 = (blob) => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

async function exportSceneFile(fileName: string, outputDir: string) {
  const scene = window.scene
  const gltf = await GLTF2Export.GLBAsync(scene, fileName, {
    exportUnusedUVs: true
  })
  const base64 = (await blobToBase64(Object.values(gltf.glTFFiles)[0])) as string
  return window.api.writeFile({
    path: sanitizeUrl(outputDir),
    name: fileName,
    base64: base64.split(';base64,').pop()
  })
}

async function findAndGetFileInFolder(path: string, file: string) {
  const filesList: string[] = await window.api.getFilesInDirectory(sanitizeUrl(path))
  const fileName = filesList.find((f) => f.includes(file))
  const filePath = sanitizeUrl(path) + '\\' + fileName

  const data = await window.api.getFileData(filePath)
  return 'data:image/png;base64,' + data
}
