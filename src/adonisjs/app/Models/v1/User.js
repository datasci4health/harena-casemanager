'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Database = use('Database')

class User extends Model {

    
    static async getAuthenticatedUser(email){
        return await Database.table('users').select('username', 'email').where('email', email)
    }

    cases() {
        return this.hasMany('App/Models/v1/Case')
    }

    executions () {
        return this
                .belongsToMany('App/Models/v1/CaseVersion')
                .pivotTable('executions')
                .withTimestamps()
    }

    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
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
        return this.hasMany('App/Models/Token')
    }
}

module.exports = User