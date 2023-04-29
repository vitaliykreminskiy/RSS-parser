import { CronCommand, CronJob } from 'cron'

export const scheduleJob = (
  regolarityPattern: string,
  job: CronCommand
): any => {
  const cronJob: CronJob = new CronJob(regolarityPattern, job)

  cronJob.start()
}
