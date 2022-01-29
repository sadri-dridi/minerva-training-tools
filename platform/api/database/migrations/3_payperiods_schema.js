'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayperiodsSchema extends Schema {
  up () {
    this.create('payperiods', (table) => {
      table.increments()
      table.integer("payperiod")
      table.timestamp("date_start")
      table.timestamp("date_end")
      table.timestamps()
    })
  }

  down () {
    this.drop('payperiods')
  }
}

module.exports = PayperiodsSchema
