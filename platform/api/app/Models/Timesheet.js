'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Timesheet extends Model {
    user() {
        return this.belongsTo("App/Models/User")
    }

    static get fillable() {
        return [
          "title",
          "date",
          "time_start",
          "time_end",
          "description",
        ];
      }
}

module.exports = Timesheet
