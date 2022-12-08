import { getPagePath } from '../services/generalServices.js'

import path from 'path'
const __dirname = path.resolve()

let sessionName

const getLoginController = async (req, res) => {
  if (req.isAuthenticated()) {
    req.session.userName = req.user.username
    res.redirect('/home')
  } else {
    const pagePath = getPagePath(__dirname, '/views/login.html')
    res.sendFile(pagePath)
  }
}

const postLoginController = async (req, res) => {
  const user = req.user
  console.log(user)
  req.session.userName = req.body.username
  sessionName = req.session.userName
  res.redirect('/home')
}

const getFailLoginController = async (req, res, next) => {
  console.log('Login error')
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    const pagePath = getPagePath(__dirname, '/views/pages/login-error')
    res.render(pagePath, {})
  })
}

const getSignupController = async (req, res) => {
  const pagePath = getPagePath(__dirname, '/views/signup.html')
  res.sendFile(pagePath)
}

const postSignUpController = async (req, res) => {
  const user = req.user
  console.log(user)
  const pagePath = getPagePath(__dirname, '/views/login.html')
  res.sendFile(pagePath)
}

const getFailSignUpController = async (req, res) => {
  console.log('Signup error')
  const pagePath = getPagePath(__dirname, '/views/pages/signup-error')
  res.render(pagePath, {})
}

const getLogoutController = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ status: 'Logout error', body: err })
    } else {
      const pagePath = getPagePath(__dirname, '/views/pages/logout.ejs')
      res.render(pagePath, {
        sessionName
      })
    }
  })
}

export {
  getLoginController,
  postLoginController,
  getFailLoginController,
  getSignupController,
  postSignUpController,
  getFailSignUpController,
  getLogoutController
}
