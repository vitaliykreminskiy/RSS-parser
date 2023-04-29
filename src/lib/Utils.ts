import { load } from 'cheerio'

export const extractTextFromHTML = (html: string): string => {
  try {
    const select = load(html)

    return select('body').text()
  } catch (error: any) {
    return html
  }
}
