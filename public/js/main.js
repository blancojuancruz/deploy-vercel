/* eslint-disable no-undef */
const socket = io.connect()
const denormalize = normalizr.denormalize
const schema = normalizr.schema

const formPostMessage = document.getElementById('formPostMessage')
const formSaveProduct = document.getElementById('formSaveProduct')
const inputUsername = document.getElementById('inputUsername')
const inputMessage = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')

formSaveProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const product = {
    title: formSaveProduct[0].value,
    price: formSaveProduct[1].value,
    thumbnail: formSaveProduct[2].value
  }
  socket.emit('newProduct', product)
  formSaveProduct.reset()
})

socket.on('products', (products) => {
  makeHtmlTable(products).then((html) => {
    document.getElementById('products').innerHTML = html
  })
})

const makeHtmlTable = async (products) => {
  const res = await fetch('templates/products.hbs')
  const tpl = await res.text()
  const template = Handlebars.compile(tpl)
  const html = template({ products })
  return html
}

const schemaAuthor = new schema.Entity('authors', {}, { idAttribute: 'email' })

const schemaMessage = new schema.Entity('text', {
  author: schemaAuthor
})

const schemaMessages = new schema.Entity('posts', {
  messages: [schemaMessage]
})

formPostMessage.addEventListener('submit', (e) => {
  e.preventDefault()

  const date = new Date()
  const fyh = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  const message = {
    author: {
      email: inputUsername.value,
      fName: document.getElementById('firstname').value,
      lName: document.getElementById('lastname').value,
      age: document.getElementById('age').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value
    },
    text: inputMessage.value,
    fyh
  }

  socket.emit('newMessage', message)
  formPostMessage.reset()
  inputMessage.focus()
})

socket.on('messages', (normalizedMessages) => {
  const denormalizedMessages = denormalize(
    normalizedMessages.result,
    schemaMessages,
    normalizedMessages.entities
  )
  const originalSize = JSON.stringify(denormalizedMessages).length
  const compressSize = JSON.stringify(normalizedMessages).length
  const compressRatio = ((100 * compressSize) / originalSize).toFixed(2)

  document.getElementById('compression-info').innerText = compressRatio

  const messageHtml = makeHtmlList(denormalizedMessages.messages)
  document.getElementById('messages').innerHTML = messageHtml
})

const makeHtmlList = (messages) => {
  return messages
    .map((message) => {
      return `
            <div>
                <b style="color:blue;">${message.author.email}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.text}</i>
                <img width="50" src="${message.author.avatar}" alt=" ">
            </div>
        `
    })
    .join(' ')
}

inputUsername.addEventListener('input', () => {
  const existEmail = inputUsername.value.length
  const existText = inputMessage.value.length
  inputMessage.disabled = !existEmail
  btnSend.disabled = !existEmail || !existText
})

inputMessage.addEventListener('input', () => {
  const existText = inputMessage.value.length
  btnSend.disabled = !existText
})
