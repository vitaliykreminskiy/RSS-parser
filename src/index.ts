import express from 'express'

import { RSS_SOURCES, parseRSSFeed } from './lib/RSSParser'
import { CONFIG } from './config/app'
import { scheduleJob } from './lib/JobScheduler'
import { Logger } from './lib/Logger'
import { Post } from './models/Post'

const app = express()

app.get('/', (req, res) => {
  parseRSSFeed(RSS_SOURCES.lifehacker)
    .then((result) => res.send(result))
    .catch((e) => res.send(e.message))
})

app.listen(CONFIG.PORT, () => {
  console.log(`🚀 The app is running on port ${CONFIG.PORT}`)
  scheduleJob('* * * * *', () =>
    parseRSSFeed(RSS_SOURCES.lifehacker)
      .then((posts) => {
        Post.insertFeedBatch(posts)

        Logger.info('Parser', 'Parsing')
      })
      .catch((_) => Logger.info('Parser', 'Parsing error'))
  )
})
