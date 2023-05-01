import Knex, { Knex as KnexType } from 'knex'

import { CONFIG } from './config/app'

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = CONFIG

const knexConfig: KnexType.Config = {
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
  },
}

export const DB = Knex(knexConfig)

export default knexConfig
