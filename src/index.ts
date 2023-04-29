import express from 'express'

import { CONFIG } from './config/app'
import { RSS_SOURCES, parseRSSFeed } from './lib/RSSParser'
import { scheduleParsingJob } from './lib/JobScheduler'

const app = express()

app.get('/', (_, res) => {
  parseRSSFeed(RSS_SOURCES.lifehacker)
    .then((result) => res.send(result))
    .catch((e) => res.send(e.message))
})

app.listen(CONFIG.PORT, () => {
  console.log(`🚀 The app is running on port ${CONFIG.PORT}`)
  scheduleParsingJob()
})
