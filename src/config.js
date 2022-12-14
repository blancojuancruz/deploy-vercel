import parseArgs from 'minimist'
import * as dotenv from 'dotenv'
dotenv.config()

const options = {
  default: { port: 8080, mode: 'fork' },
  alias: { p: 'port', m: 'mode' }
}

const args = parseArgs(process.argv, options)

export default {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITE3
    },
    useNullAsDefault: true
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: '',
      database: process.env.MARIADB_DATABASE
    }
  },
  fileSystem: {
    path: process.env.FILESYSTEM_PATH
  },
  mongoDb: {
    EXPIRATION_TIME: parseInt(process.env.MONGODB_EXPIRATION),
    mongoDbUrl: process.env.MONGODB_DATA_BASE_URL,
    mongoDbExpiration: process.env.MONGODB_EXPIRATION,
    ADVANCED_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  server: {
    PORT: process.env.PORT || 8080,
    MODE: args.m.toUpperCase()
  }
}
