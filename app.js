// app.js
const Koa = require('koa')
const koaRouter = require('koa-router')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const KoaBody = require('koa-body')
const path = require('path')
const mainRoutes = require('./routes')
const errorRoutes = require('./routes/error-routes')
const urlFilter = require('./middlewares/urlFilter')
const response = require('./middlewares/response')
const catchError = require('./middlewares/CatchError')
require('./eureka')

// const util = './utils/util'
const app = new Koa()
const router = koaRouter()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  console.log('start logger')
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(require('koa-static')(__dirname + '/public'))
app.use(catchError)
// 响应请求处理
app.use(response)

// 登录token验证
app.use(urlFilter('/auth/'))
app.use(mainRoutes.routes())
app.use(mainRoutes.allowedMethods())
app.use(errorRoutes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
