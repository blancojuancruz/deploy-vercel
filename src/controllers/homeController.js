import { getPagePath } from '../services/generalServices.js'

import path from 'path'
const __dirname = path.resolve()

const getMainController = async (req, res) => {
  res.send('Express server ready')
}

const getHomeController = async (req, res) => {
  if (req.session.userName) {
    const pagePath = getPagePath(__dirname, '/views/pages/home.ejs')
    console.log('#####1#####\n', req.session.userName)
    res.render(pagePath, {
      userName: req.session.userName
    })
  } else {
    const pagePath = getPagePath(__dirname, '/views/login.html')
    res.sendFile(pagePath)
  }
}

const getProductTestController = async (req, res) => {
  const pagePath = getPagePath(__dirname, '/views/products-test-view.html')
  res.sendFile(pagePath)
}

export { getMainController, getHomeController, getProductTestController }
