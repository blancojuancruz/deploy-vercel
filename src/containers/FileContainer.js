import { promises as fs } from 'fs'

class FileContainer {
  constructor (route) {
    this.route = route
  }

  getAll = async () => {
    try {
      const objs = await fs.readFile(this.route, 'utf-8')

      return JSON.parse(objs)
    } catch (error) {
      return []
    }
  }

  getById = async (id) => {
    const objs = await this.getAll()
    const search = objs.find((obj) => obj.id === id)

    return search
  }

  save = async (element) => {
    const elements = await this.getAll()
    let id
    const length = elements.length
    if (length > 0) {
      id = (parseInt(elements[length - 1].id) + 1).toString()
    } else {
      id = '1'
    }
    element.id = id
    element.timestamp = Date.now()
    elements.push(element)
    await fs.writeFile(this.route, JSON.stringify(elements))
  }

  update = async (elem, id) => {
    const objs = await this.getAll()
    const index = objs.findIndex((o) => o.id === id)
    if (index === -1) {
      throw new Error(`Error al actualizar: no se encontró el id ${id}`)
    } else {
      objs[index] = { ...elem, id }
      try {
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
      } catch (error) {
        throw new Error(`Error al borrar: ${error}`)
      }
    }
  }

  deleteById = async (id) => {
    const objs = await this.getAll()
    const index = objs.findIndex((o) => o.id === id)
    if (index === -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`)
    }
    objs.splice(index, 1)

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  deleteAll = async () => {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`)
    }
  }
}

export default FileContainer
