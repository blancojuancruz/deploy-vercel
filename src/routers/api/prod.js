import { Router } from 'express'
import { createNFakeProducts } from '../../mocks/products.js'

const productsApiRouter = new Router()

productsApiRouter.get('/api/products', (request, response) => {
  response.json(createNFakeProducts(5))
})

export default productsApiRouter
