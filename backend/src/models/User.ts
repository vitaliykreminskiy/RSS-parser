import { Knex } from 'knex'

import { DB } from '../knexfile'
import { getMD5 } from '../lib/Utils'

export type LoginCredentials = Omit<User, 'id'>

export class User {
  public static readonly TABLE_NAME: string = 'users'
  private static query: () => Knex.QueryBuilder = () =>
    DB<User>(User.TABLE_NAME)

  constructor(input: object) {
    Object.assign(this, input)
  }

  static find = async (userId: number): Promise<User> => {
    const user = await User.query().where('id', userId).first()

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  static findByCredentials = async (
    credentials: LoginCredentials
  ): Promise<User> => {
    const passwordHash: string = getMD5(credentials.password)

    const user: User = await User.query()
      .select('*')
      .where({
        ...credentials,
        password: passwordHash,
      })
      .first()

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  public id!: number
  public username!: string
  public password!: string
}
