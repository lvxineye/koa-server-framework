const db = require('../config/db.js')
const userModel = '../schema/user.js'

const healthyDB = db.HealthyDB

const User = healthyDB.import(userModel)

class UserModel {
  // 小程序端埋点增加记录
  static async testList() {
    // return await UserRecord.findAll({where: {user_id: 168}}).then(testList => {
    return await User.findAll().then(testList => {
      const list = []
      testList.forEach(item => {
        list.push(item.dataValues)
      })
      return list
    })
  }
}

module.exports = UserModel
