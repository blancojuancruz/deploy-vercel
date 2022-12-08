import { Router } from 'express'
import { fork } from 'child_process'

const generateRouter = new Router()

generateRouter.get('/api/randoms', (request, response) => {
  const qty = parseInt(request.query.quantity)

  const compute = fork('./src/process/getRandomNumber.js')

  compute.send({ intruction: 'start', qty })

  compute.on('message', (numObj) => {
    response.end(`${JSON.stringify(numObj)}`)
  })
})
