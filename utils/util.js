var koa2Timeout = async function(ctx, next) {
  var tmr = null
  const timeout = 5000 //设置超时时间
  await Promise.race([
    new Promise(function(resolve, reject) {
      tmr = setTimeout(function() {
        var e = new Error('Request timeout')
        e.status = 408
        reject(e)
      }, timeout)
    }),
    new Promise(function(resolve) {
      //使用一个闭包来执行下面的中间件
      (async function() {
        await next()
        clearTimeout(tmr)
        resolve()
      })()
    })
  ])
}


function myTimeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms, 'done')
  })
}

export default {
  koa2Timeout,
  myTimeout
}
