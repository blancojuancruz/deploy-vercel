import config from '../config.js'

import FileContainer from '../containers/FileContainer.js'

const productsApi = new FileContainer(`${config.fileSystem.path}/products.json`)

export default productsApi
