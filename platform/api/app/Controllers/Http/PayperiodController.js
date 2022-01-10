'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Payperiod = use("App/Models/Payperiod");
const Database = use("Database");

/**
 * Resourceful controller for interacting with payperiods
 */
class PayperiodController {
  /**
   * Show a list of all payperiods.
   * GET payperiods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    const user = await auth.getUser();
    const payperiods = await Payperiod.query().fetch();
    console.log(payperiods)
    return response.send(payperiods);
  }

  /**
   * Render a form to be used for creating a new payperiod.
   * GET payperiods/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new payperiod.
   * POST payperiods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const payperiod = request.only(Payperiod.fillable);
    const user = await auth.getUser();
    const trx = await Database.beginTransaction();
    try {
      if(user.role === 'admin'){
        await Payperiod.create(payperiod, trx);
        await trx.commit();
        return response.status(201).send("Created");  
      }else{
        trx.rollback();
        return response.status(400).send("InvalidCredentials");
      }
    } catch (e) {
      console.log(e);
      trx.rollback();
      return response.status(400).send("NotCreated");
    }
  }

  /**
   * Display a single payperiod.
   * GET payperiods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing payperiod.
   * GET payperiods/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update payperiod details.
   * PUT or PATCH payperiods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(Payperiod.fillable);
    const user = await auth.getUser();
    
    if(user.role === 'admin'){
      const payperiod = await Payperiod.query()
        .where("id", request.input("id"))
        .first();
    
      payperiod.merge(data);

      try {
        await payperiod.save();
        return response.status(201).send("Updated");
      } catch (e) {
        return response.status(400).send("NotUpdated");
      }
    }else{
      return response.status(400).send("InvalidCredentials");
    }
  }

  /**
   * Delete a payperiod with id.
   * DELETE payperiods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = await auth.getUser();
    
    if(user.role === 'admin'){
      try {
        await Payperiod.query()
          .where("id", params.id)
          .delete();
        return response.status(201).send("Deleted");
      } catch (e) {
        console.log(e)
        return response.status(400).send("NotDeleted");
      }
    }else{
      return response.status(400).send("InvalidCredentials");
    }
  }
}

module.exports = PayperiodController
