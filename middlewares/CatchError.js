import exception from '../errors/ApiError'

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch(error) {
    if(error instanceof exception) {
      return ctx.error({code: error.code, msg: error.message});
    } else {
      return ctx.error({code: '-1', msg: '服务异常'})
    }
  }
}

module.exports = catchError
