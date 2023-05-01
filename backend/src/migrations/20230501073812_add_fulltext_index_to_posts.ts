import { Knex } from 'knex'

const TABLE_NAME: string = 'posts'
const INDEX_NAME: string = 'fulltext_index'
const index_columns: string[] = ['title', 'content', 'author']

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    `ALTER TABLE ${TABLE_NAME} ADD FULLTEXT ${INDEX_NAME} (${index_columns.join(
      ', '
    )})`
  )
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`ALTER TABLE ${TABLE_NAME} DROP INDEX ${INDEX_NAME}`)
}
