import knex from 'knex'
import config from '../src/config.js'

const mariaDbTable = async () => {
  try {
    const mariaDbClient = knex(config.mariaDb)

    await mariaDbClient.schema.dropTableIfExists('products')

    await mariaDbClient.schema.createTable('products', table => {
      table.increments('id').primary()
      table.string('title', 15).notNullable()
      table.float('price')
      table.string('thumbnail')
    })

    await mariaDbClient.destroy()
  } catch (error) {
    console.log(error)
  }
}

const sqliteTable = async () => {
  try {
    const sqliteClient = knex(config.sqlite3)

    await sqliteClient.schema.dropTableIfExists('messages')

    await sqliteClient.schema.createTable('messages', table => {
      table.increments('id').primary()
      table.string('name', 20).notNullable()
      table.string('message', 50)
      table.string('fyh').notNullable()
    })

    await sqliteClient.destroy()
  } catch (error) {
    console.log(error)
  }
}

mariaDbTable()
sqliteTable()
