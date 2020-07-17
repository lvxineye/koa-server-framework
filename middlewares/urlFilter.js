// ./middlewares/uriFilter.js

// const VerifyToken = require('./tokenVerify')
const ApiError = require('../errors/ApiError')
const ApiErrorNames = require('../errors/ApiErrorNames')
const {
  newRedis,
  RedisGet
} = require('../config/ioredis')

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
          console.log('token is null')
          throw new ApiError(ApiErrorNames.USER_LOGIN_EXPIRED);
        }
      } else {
        console.log('user un login')
        throw new ApiError(ApiErrorNames.USER_UN_LOGIN)
      }
    }
    await next()

  }
}

module.exports = urlFilter
