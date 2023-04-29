import express from 'express'

import { CONFIG } from './config/app'
import { scheduleParsingJob } from './lib/JobScheduler'
import { PostsController } from './controllers/PostsController'

const app = express()

// app.get('/', (_, res) => {
//   parseRSSFeed(RSS_SOURCES.lifehacker)
//     .then((result) => res.send(result))
//     .catch((e) => res.send(e.message))
// })

app.use(express.json())

app.use('/api/posts', PostsController)

app.listen(CONFIG.PORT, () => {
  console.log(`🚀 The app is running on port ${CONFIG.PORT}`)
  scheduleParsingJob()
})
