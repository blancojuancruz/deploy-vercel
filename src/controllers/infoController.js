import { getPagePath } from '../services/generalServices.js'
import { cpus } from 'os'

import path from 'path'
const __dirname = path.resolve()

const enviromentVariablesFn = () => {
  const inputs = []
  for (let i = 2; i < process.argv.length; i++) {
    inputs.push(process.argv[i])
  }
  return inputs
}

const enviromentVariables = enviromentVariablesFn()
const currentDirectory = process.cwd()
const processId = process.pid
const nodeVersion = process.version
const proccesTitle = process.title
const operatingSystem = process.platform
const memory = process.memoryUsage().rss
const numCpu = cpus().length
const info = {
  enviromentVariables,
  operatingSystem,
  nodeVersion,
  memory,
  proccesTitle,
  processId,
  currentDirectory,
  numCpu
}

const getInfoController = async (req, res) => {
  const pagePath = getPagePath(__dirname, '/views/pages/info.ejs')
  res.render(pagePath, info)
}

const getCompressedInfoController = async (req, res) => {
  await getInfoController(req, res)
}

export { getInfoController, getCompressedInfoController }
