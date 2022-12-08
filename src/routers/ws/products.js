import productsApi from '../../api/products.js'

export default async function addProductsHandlers (socket, sockets) {
  let products = await productsApi.getAll()
  socket.emit('products', products)

  socket.on('newProduct', async (product) => {
    await productsApi.save(product)
    products = await productsApi.getAll()
    sockets.emit('products', products)
  })
}
