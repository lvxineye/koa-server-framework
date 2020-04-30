import Koa from 'koa'
import koaRouter from 'koa-router'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import KoaBody from 'koa-body'
import path from 'path'
import './eureka'
import mainRoutes from './routes';
import errorRoutes from './routes/error-routes'
import urlFilter from './middlewares/urlFilter'
import response from './middlewares/response'
import catchError from './middlewares/catchError'

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
