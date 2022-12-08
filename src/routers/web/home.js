import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'
const __dirname = path.resolve()
const productsWebRouter = new Router()

productsWebRouter.get('/home', webAuth, (req, res) => {
  if (req.session.userName) {
    res.render(path.join(__dirname + '/views/pages/home.ejs'), {
      userName: req.session.userName
    })
  } else {
    res.sendFile(path.join(__dirname + '/views/login.html'))
  }
})

productsWebRouter.get('/products-test-view', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/products.test.html'))
})

export default productsWebRouter
