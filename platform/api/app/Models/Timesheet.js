'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Timesheet extends Model {
    user() {
        return this.belongsTo("App/Models/User")
    }

    payperiod() {
        return this.hasOne("App/Models/Payperiod")
    }

    static get fillable() {
        return [
          "payperiod_id",
          "date",
          "hours",
          "description",
        ];
      }
}

module.exports = Timesheet
