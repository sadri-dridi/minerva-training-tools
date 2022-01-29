'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimesheetSchema extends Schema {
  up () {
    this.create('timesheets', (table) => {
      table.increments()
      table.integer("user_id")
      table.integer("payperiod_id")
      table.string("date", 60)
      table.string("hours", 60)
      table.text("description")
      table.timestamps()

      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")

      table
        .foreign("payperiod_id")
        .references("id")
        .inTable("payperiods")
        .onDelete("cascade")
    })
  }

  down () {
    this.drop('timesheets')
  }
}

module.exports = TimesheetSchema
