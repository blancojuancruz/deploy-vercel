import { normalize, schema } from 'normalizr'

const schemaAuthor = new schema.Entity('authors', {}, { idAttribute: 'email' })

const schemaMessage = new schema.Entity('text', {
  author: schemaAuthor
})

const schemaMessages = new schema.Entity('posts', {
  messages: [schemaMessage]
})

const normalizeMessages = (messages) => {
  const normalizedMessages = {
    id: 'messages',
    messages
  }

  return normalize(normalizedMessages, schemaMessages)
}

export { normalizeMessages }
