
const ApiError = require('../errors/ApiError')
const ApiErrorNames = require('../errors/ApiErrorNames')
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

  static async getById(userId) {
    if (-1 == userId) {
      throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
    } else {
      console.log('get user info by id:', userId)
      return {
        'userId':userId,
        'userName': '姓名'
      }
    }
  }

  static async getByPhoneNumber(phoneNumber) {
    return {
      'userId': 100010,
      'userName': '张三',
      'phoneNumber': phoneNumber
    }
  }
}

module.exports = UserModel
