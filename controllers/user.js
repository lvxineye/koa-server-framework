const UserModel = require('../models/user')
const {
  NewRedis,
  RedisGet
} = require('../config/ioredis')

class UserController {
  // 测试列表
  static async testList(ctx) {
    let {
      currentPage,
      pageNum
    } = ctx.request.query
    if (!currentPage) {
      console.log(currentPage, 'currentPage', pageNum)
      ctx.error({})
    } else {
      let data = await UserModel.testList()
      // NewRedis.set('/list',JSON.stringify({Ou:data}))
      // NewRedis.set('testToken','测试token')
      // RedisGet('testToken')
      console.log('data=>>>', data.length)
      ctx.success({
        data: data
      })
    }
  }

  static async getById(ctx) {
    let userId = ctx.request.query.userId
    console.log('请求参数，userId=', userId)
    let data = await UserModel.getById(userId)
    console.log('返回结果，data=', data)
    ctx.success({
      data: data
    })
  }

  static async getByPhoneNumber(ctx) {
    let phoneNumber = ctx.request.query.phoneNumber
    console.log('请求参数, phoneNumber=', phoneNumber)
    console.log('手机号为空, ', (phoneNumber.trim().length))
    if (0 == phoneNumber.trim().length) {
      ctx.error({
        msg: '手机号不能为空！'
      })
    } else {
      let data = await UserModel.getByPhoneNumber(phoneNumber)
      console.log('返回结果, data=', data)
      ctx.success({
        data: data
      })
    }
  }
}


module.exports = UserController
