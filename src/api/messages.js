import config from '../config.js'

import FileContainer from '../containers/FileContainer.js'

const messagesApi = new FileContainer(`${config.fileSystem.path}/messages.json`)

export default messagesApi
