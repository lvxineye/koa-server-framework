const koaRouter = require('koa-router')
const Order = require('../controllers/order.js')

const router = new koaRouter()

// 小程序端埋点数据列表
// router.get('/list', Order.testList)

router.get('/test', Order.testList)

module.exports = router
