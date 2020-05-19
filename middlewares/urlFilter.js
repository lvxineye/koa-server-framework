// ./middlewares/uriFilter.js

// const VerifyToken = require('./tokenVerify')
import ApiError from '../errors/ApiError'
import ApiErrorNames from '../errors/ApiErrorNames'
import {
  newRedis,
  RedisGet
} from '../config/ioredis'

const urlFilter = (pattern) => {
  return async (ctx, next) => {
    let reg = new RegExp(pattern)
    // 先去执行路由
    if (reg.test(ctx.originalUrl)) {
      // 登录token验证
      const token = ctx.request.headers['x-access-token']
      // VerifyToken.verify(token)
      if (token) {
        console.log('**********', token, reg.test(ctx.originalUrl), ctx.originalUrl)
        const uuaToken = `uua-shiro-cache:shiro-activeSessionCache:${token}`
        var checkeToken = await RedisGet(uuaToken)
        if (checkeToken == null) {
          throw new ApiError(ApiErrorNames.USER_LOGIN_EXPIRED);
        }
      } else {
        throw new ApiError(ApiErrorNames.USER_UN_LOGIN)
      }
    }
    await next()

  }
}

module.exports = urlFilter
