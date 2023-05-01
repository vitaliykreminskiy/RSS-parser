import { CronCommand, CronJob } from 'cron'

import { Post } from '../models/Post'
import { Logger } from './Logger'
import { parseRSSFeed, RSS_SOURCES } from './RSSParser'

const CRON_EVERY_MINUTE: string = '* * * * *'
const LOG_TAG: string = 'Job Scheduler'

export const scheduleJob = (
  regolarityPattern: string,
  job: CronCommand
): any => {
  const cronJob: CronJob = new CronJob(regolarityPattern, job)

  cronJob.start()
}

export const scheduleParsingJob = () => {
  const job = () =>
    parseRSSFeed(RSS_SOURCES.lifehacker).then((posts) => {
      Post.insertFeedBatch(posts)
    })

  scheduleJob(CRON_EVERY_MINUTE, job)
  Logger.info(LOG_TAG, `Parsing job scheduled (${CRON_EVERY_MINUTE})`)
}
