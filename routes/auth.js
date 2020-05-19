import koaRouter from 'koa-router'


const router = new koaRouter()

// 小程序端埋点数据列表
// router.get('/list', Order.testList)

router.get('/test', function(ctx, next) {
  ctx.success({
    data: 'data'
  })
})

module.exports = router
