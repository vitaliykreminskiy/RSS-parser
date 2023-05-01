import { Knex } from 'knex'

exports.seed = function (knex: Knex) {
  return knex('users').then(function () {
    return knex('users').insert([
      { username: 'admin', password: '21232f297a57a5a743894a0e4a801fc3' },
    ])
  })
}
