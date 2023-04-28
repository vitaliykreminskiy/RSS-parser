import express from 'express'
import { parseRSSFeed } from './lib/RSSParser'

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  parseRSSFeed('https://lifehacker.com/rss')
    .then((result) => res.send(result))
    .catch((e) => res.send(e.message))
})

app.listen(PORT, () => {
  console.log(`🚀 The app is running on port ${PORT}`)
})
