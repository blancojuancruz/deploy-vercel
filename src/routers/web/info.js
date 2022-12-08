import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'
const __dirname = path.resolve()
const infoWebRouter = new Router()

const envVar = () => {
  const inputs = []
  for (let i = 2; i < process.argv.length; i++) {
    inputs.push(process.argv[i])
  }
  return inputs
}

const enviromentVariables = envVar()
const currentDirectory = process.cwd()
const processId = process.pid
const nodeVersion = process.version
const proccesTitle = process.title
const operatingSystem = process.platform
const memory = process.memoryUsage().rss

infoWebRouter.get('/info', webAuth, (req, res) => {
  res.render(path.join(__dirname + '/views/pages/info.ejs'), {
    enviromentVariables,
    operatingSystem,
    nodeVersion,
    memory,
    proccesTitle,
    processId,
    currentDirectory
  })
})

export default infoWebRouter
