import express from 'express'
import session from 'express-session'
import bCrypt from 'bcrypt'
import dotenv from 'dotenv'

import cluster from 'cluster'
import { cpus } from 'os'
import { logger } from './log/log.js'

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import config from './config.js'
import { conectDB } from './controllers.js'
import { User } from './model.js'

import authWebRouter from './routers/web/auth.js'
import productsWebRouter from './routers/web/home.js'
import productsApiRouter from './routers/api/prod.js'
import infoWebRouter from './routers/web/info.js'

import addProductsHandlers from './routers/ws/products.js'
import addMessagesHandlers from './routers/ws/messages.js'
const cpu = cpus().length

dotenv.config()

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, false)
        }

        const newUser = {
          username,
          password: createHash(password)
        }

        User.create(newUser, (err, userWithId) => {
          if (err) {
            return done(err)
          }
          return done(null, userWithId)
        })
      })
    }
  )
)

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (!isValidPassword(user, password)) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password)
}

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

io.on('connection', async (socket) => {
  addProductsHandlers(socket, io.sockets)
  addMessagesHandlers(socket, io.sockets)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: config.mongoDb.EXPIRATION_TIME
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('', productsApiRouter)

app.use('', authWebRouter)
app.use('', productsWebRouter)
app.use('', infoWebRouter)

app.get('*', (req, res) => {
  logger.warn('Route not implemented')
  res.send('Route not implemented')
})

conectDB(config.mongoDb.mongoDbUrl, (err) => {
  if (err) return console.log('Database connection error', err)
  console.log('Database connected')

  if (cluster.isPrimary && config.server.MODE === 'CLUSTER') {
    for (let i = 0; i < cpu; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Work ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    httpServer.listen(config.server.PORT, (err) => {
      if (err) return console.log(`Server error ${err}`)
      console.log(
        `Server http running on port ${config.server.PORT} - PID ${process.pid}`
      )
    })
  }
})
