import chalk from 'chalk'

export class Logger {
  static info = (tag: string, message: string) => {
    console.log(chalk.bgBlue(tag), message)
  }
}
