import messagesApi from '../../api/messages.js'
import { normalizeMessages } from '../../normalizr/messages.js'

export default async function addMessagesHandlers (socket, sockets) {
  let messages = await messagesApi.getAll()

  let normalizedMessages = normalizeMessages(messages)
  socket.emit('messages', normalizedMessages)

  socket.on('newMessage', async (message) => {
    await messagesApi.save(message)
    messages = await messagesApi.getAll()
    normalizedMessages = normalizeMessages(messages)
    sockets.emit('messages', normalizedMessages)
  })
}
