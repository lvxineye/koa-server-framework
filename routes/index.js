// ./routes/index.js
import koaRouter from 'koa-router'
import User from './user'
import Order from './order'
import Auth from './auth'

const router = koaRouter()

router.prefix('/api')
  .use('/user', User.routes())
  .use('/order', Order.routes())
  .use('/auth', Auth.routes())

module.exports = router
