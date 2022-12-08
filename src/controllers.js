import mongoose from 'mongoose'

export const conectDB = (url, cb) => {
  mongoose.connect(
    url, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
      if (cb != null) cb(error)
    }
  )
}
