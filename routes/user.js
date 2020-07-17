const koaRouter = require('koa-router')
const User = require('../controllers/user')

const router = new koaRouter()

router.get('/test', User.testList)
router.get('/getByPhoneNumber', User.getByPhoneNumber)
router.get('/getById', User.getById)

module.exports = router
