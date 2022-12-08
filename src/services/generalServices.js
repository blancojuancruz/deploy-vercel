import path from 'path'

export const getPagePath = (dir, pathFile) => {
  const relativePath = path.join(dir + pathFile)
  return relativePath
}
