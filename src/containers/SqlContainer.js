import knex from 'knex'

class SqlContainer {
  constructor (config, table) {
    this.knex = knex(config)
    this.table = table
  }

  getById = async (id) => {
    const element = await this.knex
      .from(this.table)
      .select('*')
      .where('id', id)

    return element
  }

  getAll = async () => {
    const elements = []
    try {
      const elementsDB = await this.knex.from(this.table).select('*')
      for (const element of elementsDB) {
        elements.push({ ...element })
      }

      return elements
    } catch (err) {
      return elements
    }
  }

  save = async (elem) => {
    await this.knex(this.table).insert(elem)
  }

  update = async (elem, id) => {
    await this.knex.from(this.table).where('id', id).update(elem)
  }

  deleteById = async (id) => {
    await this.knex.from(this.table).where('id', id).del()
  }

  deleteAll = async () => {
    await this.knex.from(this.table).del()
  }

  disconnect = async () => {
    await this.knex.destroy()
  }
}

export default SqlContainer
