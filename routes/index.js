import koaRouter from 'koa-router'
import User from './user'
import Order from './order'

const router = koaRouter()

router.prefix('/api')
  .use('/user', User.routes())
  .use('/order', Order.routes())

module.exports = router
