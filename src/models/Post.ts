import _ from 'lodash'
import moment from 'moment'

import { DB } from '../knexfile'
import { Logger } from '../lib/Logger'
import { extractTextFromHTML } from '../lib/Utils'

type PostBase = Omit<Post, 'id'>
type PageOptions = {
  page: number
  perPage?: number
  search?: string
}

const LIFEHACKER_DATETIME_FORMAT: string = 'ddd, DD MMM YYYY HH:mm:ss Z'
const MYSQL_DATETIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss'

export class Post {
  public static readonly TABLE_NAME: string = 'posts'
  public static readonly PER_PAGE_DEFAULT: number = 20

  private static readonly LOG_TAG: string = 'Post Model'

  constructor(input: object) {
    Object.assign(this, input)
  }

  /**
   * Note that content contains raw html so we need to parse it for
   * the further processing
   */
  static fromLifehackerFeed = (feed: LifehackerFeed): PostBase[] => {
    const entries: LifehackerEntry[] | false = _.get(
      feed,
      ['rss', 'channel', 'item'],
      false
    )

    if (!entries) {
      return []
    }

    return entries.map((entry) => {
      const preparedPublishingDate: string = moment(
        entry.pubDate,
        LIFEHACKER_DATETIME_FORMAT
      ).format(MYSQL_DATETIME_FORMAT)

      return {
        title: entry.title,
        content: extractTextFromHTML(entry.description),
        author: entry['dc:creator'],
        thumbnail_url: entry['media:thumbnail']['@_url'],
        published_at: preparedPublishingDate,
        guid: String(entry.guid['#text']),
      }
    })
  }

  /**
   * Insert only those posts that not yet in DB
   * (determined by `guid` column)
   */
  static insertFeedBatch = async (posts: PostBase[]) => {
    const presentPosts: Array<Pick<Post, 'guid'>> = await DB<Post>(
      Post.TABLE_NAME
    ).select('guid')
    const presentGUIDs: string[] = presentPosts
      .filter((post) => Boolean(post.guid))
      .map((post) => post.guid) as string[]
    const insertCandidates: PostBase[] = posts.filter(
      (post) => post.guid && !presentGUIDs.includes(post.guid)
    )

    Logger.info(
      Post.LOG_TAG,
      `${posts.length} incoming. ${insertCandidates.length} new.`
    )

    for (const post of insertCandidates) {
      await DB(Post.TABLE_NAME).insert(post)
      Logger.info('Post inserted', post.title)
    }
  }

  static page = async (options: PageOptions): Promise<Post> => {
    const page: number = options.page || 1
    const pageSize: number = options.perPage || Post.PER_PAGE_DEFAULT
    const offset = (page - 1) * pageSize

    const posts = await DB(Post.TABLE_NAME)
      .select('*')
      .offset(offset)
      .limit(pageSize)
  }

  public id!: number
  public title!: string
  public content!: string
  public author!: string
  public published_at!: string

  public thumbnail_url?: string
  public guid?: string
}
