type Entry = {
  title: string
  link: string
  description: string
  category: string[]
  pubDate: string
  guid: number
  'dc:creator': string
  'media:thumbnail': string
}

type Channel = {
  title: string
  link: string
  'atom:link': string
  description: string
  language: string
  item: Entry[]
}

declare interface LifehackerFeed {
  '?xml': string
  rss: {
    channel: Channel
  }
}
