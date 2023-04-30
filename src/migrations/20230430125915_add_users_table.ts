import { Knex } from 'knex'

const TABLE_NAME: string = 'users'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id')
    table.string('username').notNullable()
    table.string('password').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME)
}
