'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimesheetSchema extends Schema {
  up () {
    this.create('timesheets', (table) => {
      table.increments()
      table.integer("user_id")
      table.text("title")
      table.string("date", 60)
      table.string("time_start", 60)
      table.string("time_end", 60)
      table.text("description")
      table.timestamps()

      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
    })
  }

  down () {
    this.drop('timesheets')
  }
}

module.exports = TimesheetSchema
