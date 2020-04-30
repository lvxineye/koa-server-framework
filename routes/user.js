import koaRouter from 'koa-router'
import User from '../controllers/user'

const router = new koaRouter()

router.get('/test', User.testList)

module.exports = router
