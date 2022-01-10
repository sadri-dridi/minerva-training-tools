'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Timesheet = use("App/Models/Timesheet");
const Database = use("Database");

/**
 * Resourceful controller for interacting with timesheets
 */
class TimesheetController {
  /**
   * Show a list of all timesheets.
   * GET timesheets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const user = await auth.getUser();
    const { page, limit, filter } = request.all();
    const timesheet = await Timesheet.query().where("user_id", user.id).where("date", "ILIKE", `%${filter}%`).paginate(page, limit);
    console.log(timesheet)
    return response.send(timesheet);
  }

  /**
   * Render a form to be used for creating a new timesheet.
   * GET timesheets/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new timesheet.
   * POST timesheets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const timesheet = request.only(Timesheet.fillable);
    const user = await auth.getUser();
    timesheet.user_id = user.id;
    console.log("CHEGOU",timesheet)
    const trx = await Database.beginTransaction();
    try {
      await Timesheet.create(timesheet, trx);
      await trx.commit();
      return response.status(201).send("Created");
    } catch (e) {
      console.log(e);
      trx.rollback();
      return response.status(400).send("NotCreated");
    }
  }

  /**
   * Display a single timesheet.
   * GET timesheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    console.log("AAAAA")
    const user = await auth.getUser();
    const timesheet = await Timesheet.query().where("user_id", user.id).where("payperiod_id", params.id).orderBy('date', 'asc').fetch();
    console.log(timesheet)
    return response.send(timesheet);
  }

  /**
   * Render a form to update an existing timesheet.
   * GET timesheets/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update timesheet details.
   * PUT or PATCH timesheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(Timesheet.fillable);
    const user = await auth.getUser();
    const timesheet = await Timesheet.query()
      .where("id", request.input("id"))
      .where("user_id", user.id)
      .first();

  
    timesheet.merge(data);

    try {
      await timesheet.save();
      return response.status(201).send("Updated");
    } catch (e) {
      return response.status(400).send("NotUpdated");
    }
  }

  /**
   * Delete a timesheet with id.
   * DELETE timesheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    try {
      const user = await auth.getUser()
      await Timesheet.query()
        .where("id", params.id)
        .where("user_id", user.id)
        .delete();
      return response.status(201).send("Deleted");
    } catch (e) {
      console.log(e)
      return response.status(400).send("NotDeleted");
    }
  }
}

module.exports = TimesheetController
