import { load } from 'cheerio'
import crypto from 'crypto'

interface ICommonResponseBody {
  success: boolean
  message: string
  errors: string[]
}

export const extractTextFromHTML = (html: string): string => {
  try {
    const select = load(html)

    return select('body').text()
  } catch (error: any) {
    return html
  }
}

export const getMD5 = (input: string): string =>
  crypto.createHash('md5').update(input).digest('hex')

export const buildResponse = (
  success = true,
  message = 'success',
  errors = []
): ICommonResponseBody => {
  return {
    success: success,
    message: message,
    errors: errors,
  }
}
