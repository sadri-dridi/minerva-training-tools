"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");


class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get hidden() {
    return ["password"];
  }
  
  getAvatarUrl(user) {
    const { avatar } = user;
    if (avatar && avatar.search("http") !== -1) return avatar;
    const baseUrl = Env.get("APP_ENDPOINT");
    return `${baseUrl}/storage_user/${avatar}`;
  }

  
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }


  timesheet(){
    return this.hasMany("App/Models/Timesheet")
  }

  static get fillable() {
    return [
      "avatar",
      "name",
      "email",
      "role",
      "password",
    ];
  }
  static get computed() {
    return ["avatar_url"];
  }
}

module.exports = User;
