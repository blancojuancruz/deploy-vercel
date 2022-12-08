import { Router } from 'express'
import passport from 'passport'
import path from 'path'

const authWebRouter = new Router()
const __dirname = path.resolve()

let sessionName

authWebRouter.get('/', (request, response) => {
  response.send('Express server ready')
})

authWebRouter.get('/login', (request, response) => {
  if (request.isAuthenticated()) {
    request.session.userName = request.user.username
    response.redirect('/home')
  } else {
    response.sendFile(path.join(__dirname + '/views/login.html'))
  }
})

authWebRouter.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/faillogin' }),
  (request, response) => {
    request.session.userName = request.body.username
    sessionName = request.session.userName

    response.redirect('/home')
  }
)

authWebRouter.get('/faillogin', (request, response) => {
  response.render(path.join(__dirname + '/views/pages/logInErr'), {})
})

authWebRouter.get('/signup', (request, response) => {
  response.sendFile(path.join(__dirname + '/views/signup.html'))
})

authWebRouter.post(
  '/signup',
  passport.authenticate('signup', { failureRedirect: '/failsignup' }),
  (request, response) => {
    response.sendFile(path.join(__dirname + '/views/login.html'))
  }
)

authWebRouter.get('/failsignup', (request, response) => {
  console.log('Signup error')
  response.render(path.join(__dirname + '/views/pages/sigUpErr.ejs'), {})
})

authWebRouter.get('/logout', (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      response.json({ status: 'Logout error', body: err })
    } else {
      response.render(path.join(__dirname + '/views/pages/logOut.ejs'), {
        sessionName
      })
    }
  })
})

export default authWebRouter
