import UserModel from '../models/user'
import {
  NewRedis,
  RedisGet
} from '../config/ioredis'

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
}


module.exports = UserController
