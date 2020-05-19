# Koa2服务框架搭建（通用模板）

<i>writed by <strong>lvxin</strong> at 2020-05-18</i>

> 基于nodejs的Koa框架搭建的服务端项目，借鉴Java服务端项目的框架的特点，结合了公司的实际项目，整理归纳的通用模板。

## 前言

大部分程序员都会有一颗成为全站程序员的心。 

作为前端程序员，用nodejs作为进入后端的敲门砖，应该是最适合的选择了：

- 1. 前端开发中js知识的储备，减少了学习成本；
- 2. nodejs良好的发展势头和活跃的社区；
- 3. 有多种成熟的框架的选择；
- 4. 。。。

## 书写目的

TODO

## nodejs简介

TODO

## koa2框架简介

TODO

### 关于中间件栈

每个中间件默认接受两个参数

- 第一个参数是 Context对象
- 第二个参数是next函数，对于一个中间件函数来讲，next函数很关键
	- 无next调用
		- 不执行后续的一系列中间件
	- 有next调用，表示接着往下执行
		- 调用next函数之前，执行当前中间件逻辑
		- 调用next函数之后，该函数暂停，把执行权转交给下一个中间件，下一个中间件开始执行

多个中间件通过app.use(middleWare)加载后，形成一个“中间件栈”，执行顺序以中间件里的next函数调用为界限：

```javascript
const koa = require('koa');
const app = new koa();

const one = (ctx, next) => {
  console.log('one next之前')
  next()
  console.log('one next之后')
}

const two = (ctx, next) => {
  console.log('two next之前')
  next()
  console.log('two next之后')
}
const three = (ctx, next) => {
  console.log('three next之前')
  next()
}
const four = (ctx, next) => {
  next()
  console.log('four next之后')
}
const five = (ctx, next) => {
  console.log('five next之前')
  next()
  console.log('five next之后')
}

app.use(one)
app.use(two)
app.use(three)
app.use(four)
app.use(five)
app.use(ctx => {
  console.log('返回结果');
  ctx.body = 'hello'
})

app.listen(3000)
```

打印顺序：

```
one next之前
two next之前
three next之前
five next之前
返回结果
five next之后
four next之后
two next之后
one next之后

```

1. 最外层的中间件首先执行。
2. 调用next函数，把执行权交给下一个中间件。
3. ...
4. 最内层的中间件最后执行。
5. 执行结束后，把执行权交回上一层的中间件。
6. ...
7. 最外层的中间件收回执行权之后，执行next函数后面的代码。

中间件流程控制简单描述就是：中间件的执行是以next为界限，先执行本层中next以前的部分，遇到next后执行下一层，一层层下去。当最后一层中间件执行完毕后，再返回上一层执行next以后的部分，一层层回来。所以如果某一层没有next，说明到该层方法就执行完毕了，就开始返回上一层执行上一层的next之后的部分了。

如果中间件内部没有调用next函数，那么执行权就不会传递下去，而是向上返回了。
试试如果把five函数离得next去掉，则浏览器不会正常显示返回内容(Not Found)了。

这也就是koa所谓的洋葱模型，从外面一层层的深入，再一层层的穿出来。

![洋葱模型](https://github.com/lvxineye/koa-server-framework/blob/master/docs/koa%E6%B4%8B%E8%91%B1%E6%A8%A1%E5%BC%8F.jpg)



## 解决问题

- 不同运行环境配置

```js
// package.js
"scripts": {
    "start": "node bin/www nodemon index.js --exec babel-node",
    "dev": "cross-env NODE_ENV=dev PORT=3001 ./node_modules/.bin/nodemon bin/www nodemon index.js --exec babel-node",
    "beta": "cross-env NODE_ENV=beta PORT=3001 ./node_modules/.bin/nodemon bin/www nodemon index.js --exec babel-node",
    "prd": "cross-env NODE_ENV=production PORT=3001 pm2 start bin/www nodemon index.js --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint --ext .js"
  },
```

- 路由配置

```js
// ./routes/index.js
import koaRouter from 'koa-router'
import User from './user'
import Order from './order'

const router = koaRouter()

router.prefix('/api')
  .use('/user', User.routes())
  .use('/order', Order.routes())

module.exports = router

```

- 网络请求的封装
- 网络请求返回内容的封装
- 异常捕获封装
- 数据库操作



## 结束语

TODO
