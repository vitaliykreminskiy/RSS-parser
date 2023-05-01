import { Knex } from 'knex'

const TABLE_NAME: string = 'posts'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').unsigned()
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.string('author').notNullable()
    table.dateTime('published_at').defaultTo(knex.fn.now())
    table.text('thumbnail_url').nullable()

    /**
     * `guid` is a special field in RSS feed that uniquely identifies
     * the entry. Using this field we will determine which posts are
     * parsed and which ones manually created (manually created will have)
     * this field filled with `null`
     */
    table.string('guid').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME)
}
