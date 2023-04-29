declare interface LifehackerEntry {
  title: string
  link: string
  description: string
  category: string[]
  pubDate: string
  guid: {
    '#text': number
  }
  'dc:creator': string
  'media:thumbnail': {
    '@_url': string
  }
}

declare interface LifehackerChannel {
  title: string
  link: string
  'atom:link': string
  description: string
  language: string
  item: LifehackerEntry[]
}

declare interface LifehackerFeed {
  '?xml': string
  rss: {
    channel: LifehackerChannel
  }
}
