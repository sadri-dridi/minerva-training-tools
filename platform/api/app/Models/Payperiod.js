'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payperiod extends Model {
    static get fillable() {
        return [
          "payperiod",
          "date_start",
          "date_end"
        ];
      }
}
module.exports = Payperiod
