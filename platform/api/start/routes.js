'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
    Route.post("login", "AuthController.login").as("auth.login");
    Route.post("refresh", "AuthController.refresh").as("auth.refresh");
    Route.post("logout", "AuthController.logout").as("auth.logout");
    Route.post("me", "AuthController.me").as("auth.me");

}).prefix("v1/auth")


Route.group(() => {
    Route.put("users", "UserController.update").as("users.update");
    Route.post("users", "UserController.store").as("users.store");
    Route.get("users/:id", "UserController.show").as("users.show");

}).prefix("v1")

Route.group(() => {
    Route.get("timesheet", "TimesheetController.index").as("timesheet.index");
    Route.put("timesheet", "TimesheetController.update").as("timesheet.update");
    Route.post("timesheet", "TimesheetController.store").as("timesheet.store");
    Route.get("timesheet/:id", "TimesheetController.show").as("timesheet.show");
    Route.delete("timesheet/:id", "TimesheetController.destroy").as("timesheet.destroy");

}).prefix("v1")
