import axios from 'axios'
import { XMLParser, XMLValidator } from 'fast-xml-parser'

const fetchRSSFeedFromRemote = (remoteURL: string): Promise<string> => {
  return axios.get(remoteURL).then((result) => result.data)
}

// TODO: Make better typings management
// TODO: Add validation
export const parseRSSFeed = async (remoteURL: string): Promise<any> => {
  try {
    const rawRSSFeed: string = await fetchRSSFeedFromRemote(remoteURL)
    const parser = new XMLParser()
    const parsedContent: LifehackerFeed = parser.parse(rawRSSFeed)

    return parsedContent.rss.channel.item[0]
  } catch (e: any) {
    return Promise.reject()
  }
}
