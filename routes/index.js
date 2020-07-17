// ./routes/index.js
const koaRouter = require('koa-router')
const User = require('./user')
const Order = require('./order')
const Auth = require('./auth')

const router = koaRouter()

router.prefix('/server-name/api')
  .use('/user', User.routes())
  .use('/order', Order.routes())
  .use('/auth', Auth.routes())

module.exports = router
