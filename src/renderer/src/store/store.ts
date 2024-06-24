import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import electronSync from './middleware'

type AppState = {
  inputDir: string
  setInputDir: (inputDir: string) => void
  outputDir: string
  setOutputDir: (outputDir: string) => void
  referenceFile: string
  setReferenceFile: (referenceFile: string) => void
  filesList: string[]
  setFilesList: (filesList: string[]) => void
  materialsPairs: Array<{ from: string; to: string }>
  setMaterialPairs: (materialPairs: Array<{ from: string; to: string }>) => void
  fromMaterial: string
  setFromMaterial: (fromMaterial: string) => void
  toMaterial: string
  setToMaterial: (toMaterial: string) => void
  materialsList: string[]
  setMaterialsList: (materialsList: string[]) => void
  introWatched: boolean
  setIntroWatched: (introWatched: boolean) => void
  progress: number
  setProgress: (progress: number) => void
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
  selectedFileMaterials: string[]
  setSelectedFileMaterials: (selectedFileMaterials: string[]) => void
  materialToTextureReplacement: string
  setMaterialToTextureReplacement: (materialToTextureReplacement: string) => void
  textureName: string
  setTextureName: (textureName: string) => void
  textureType: string
  setTextureType: (textureType: string) => void
  texturesSource: string
  setTexturesSource: (texturesSource: string) => void
}

const useAppStore = create<AppState, [['zustand/persist', NonNullable<unknown>]]>(
  electronSync(
    persist(
      (set) => ({
        inputDir: '',
        setInputDir: (inputDir) =>
          set((state) => ({
            ...state,
            inputDir
          })),
        outputDir: '',
        setOutputDir: (outputDir) =>
          set((state) => ({
            ...state,
            outputDir
          })),
        referenceFile: '',
        setReferenceFile: (referenceFile) =>
          set((state) => ({
            ...state,
            referenceFile
          })),
        filesList: [],
        setFilesList: (filesList) =>
          set((state) => ({
            ...state,
            filesList
          })),
        materialsPairs: [],
        setMaterialPairs: (materialsPairs) =>
          set((state) => ({
            ...state,
            materialsPairs
          })),
        fromMaterial: '',
        setFromMaterial: (fromMaterial) =>
          set((state) => ({
            ...state,
            fromMaterial
          })),
        toMaterial: '',
        setToMaterial: (toMaterial) =>
          set((state) => ({
            ...state,
            toMaterial
          })),
        materialsList: [],
        setMaterialsList: (materialsList) =>
          set((state) => ({
            ...state,
            materialsList
          })),
        introWatched: false,
        setIntroWatched: (introWatched) =>
          set((state) => ({
            ...state,
            introWatched
          })),
        progress: 0,
        setProgress: (progress: number) =>
          set((state) => ({
            ...state,
            progress
          })),
        isProcessing: false,
        setIsProcessing: (isProcessing) =>
          set((state) => ({
            ...state,
            isProcessing
          })),
        selectedFileMaterials: [],
        setSelectedFileMaterials: (selectedFileMaterials) =>
          set((state) => ({
            ...state,
            selectedFileMaterials
          })),
        materialToTextureReplacement: '',
        setMaterialToTextureReplacement: (materialToTextureReplacement: string) =>
          set((state) => ({
            ...state,
            materialToTextureReplacement
          })),
        textureName: '',
        setTextureName: (textureName: string) =>
          set((state) => ({
            ...state,
            textureName
          })),
        textureType: '',
        setTextureType: (textureType: string) =>
          set((state) => ({
            ...state,
            textureType
          })),
        texturesSource: '',
        setTexturesSource: (texturesSource: string) =>
          set((state) => ({
            ...state,
            texturesSource
          }))
      }),
      {
        name: 'app-data', // name of item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
        partialize: (state) => ({
          inputDir: state.inputDir,
          outputDir: state.outputDir,
          referenceFile: state.referenceFile,
          materialsPairs: state.materialsPairs,
          filesList: state.filesList,
          materialsList: state.materialsList,
          introWatched: state.introWatched,
          materialToTextureReplacement: state.materialToTextureReplacement,
          textureName: state.textureName,
          textureType: state.textureType,
          texturesSource: state.texturesSource
        })
      }
    ),
    { key: 'store', excludes: [] }
  )
)

export default useAppStore
