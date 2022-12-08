import { faker } from '@faker-js/faker'

const createNFakeProducts = (product) => {
  const products = []

  for (let i = 0; i < product; i++) {
    products.push(createFakeProduct(i))
  }

  return products
}

const createFakeProduct = (id) => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
    id
  }
}

export { createFakeProduct, createNFakeProducts }
