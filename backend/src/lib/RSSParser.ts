import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

import { Post } from '../models/Post'

export const RSS_SOURCES = { lifehacker: 'https://lifehacker.com/rss' }

const fetchRSSFeedFromRemote = (remoteURL: string): Promise<string> => {
  return axios.get(remoteURL).then((result) => result.data)
}

export const parseRSSFeed = async (remoteURL: string): Promise<any> => {
  try {
    const rawRSSFeed: string = await fetchRSSFeedFromRemote(remoteURL)
    const parser = new XMLParser({ ignoreAttributes: false })
    const parsedContent: LifehackerFeed = parser.parse(rawRSSFeed)

    return Post.fromLifehackerFeed(parsedContent)
  } catch (e: any) {
    return Promise.reject()
  }
}
