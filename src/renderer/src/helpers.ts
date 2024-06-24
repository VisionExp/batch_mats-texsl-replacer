export const sanitizeUrl = (url: string): string => {
  return url ? url.replace(/\\\\/g, '\\').replaceAll('"', '') : ''
}

export const textureTypes = [
  'albedoTexture',
  'ambientTexture',
  'bumpTexture',
  'emissiveTexture',
  'lightmapTexture',
  'metallicReflectanceTexture',
  'metallicTexture',
  'microSurfaceTexture',
  'opacityTexture',
  'reflectanceTexture',
  'reflectionTexture',
  'reflectivityTexture'
]
