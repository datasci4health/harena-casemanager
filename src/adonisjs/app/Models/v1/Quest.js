'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const uuidv4 = require('uuid/v4');

class Quest extends Model {
    users(){
        return this.belongsToMany('App/Models/v1/User')
            .pivotTable('quests_users')
            .withTimestamps()
    }

    cases(){
        return this.belongsToMany('App/Models/v1/Case')
            .pivotTable('quests_cases')
            .withPivot(['order_position'])
            .withTimestamps()
    }

    static get incrementing () {
        return false
    }
}

module.exports = Quest