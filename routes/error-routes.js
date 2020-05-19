// ./routes/error-routes.js
module.exports = function() {
  return function(ctx, next) {
    switch (ctx.status) {
      case 404:
        ctx.error({
          code: '404',
          msg: '404 - 没有找到内容'
        })
        break
      case 500:
        ctx.error({
          code: ctx.status,
          msg: '500 - 服务启动中...'
        })
        break
    }
    return next()
  }
}
