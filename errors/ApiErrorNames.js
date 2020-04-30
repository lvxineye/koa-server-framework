// API 错误名称
var ApiErrorNames = {}

ApiErrorNames.UNKNOW_ERROR = 'unknow_error'
ApiErrorNames.USER_NOT_EXIST = 'user_not_exist'
ApiErrorNames.USER_LOGIN_EXPIRED = 'user_login_expired'
ApiErrorNames.USER_UN_LOGIN = 'user_un_login'

// API 错误名称对应的错误信息
const errorMap = new Map()

errorMap.set(ApiErrorNames.UNKNOW_ERROR, {
  code: -1,
  message: '未知错误'
})
errorMap.set(ApiErrorNames.USER_NOT_EXIST, {
  code: 101,
  message: '用户不存在'
})
errorMap.set(ApiErrorNames.USER_UN_LOGIN, {
  code: '-200',
  message: '用户登录'
})
errorMap.set(ApiErrorNames.USER_LOGIN_EXPIRED, {
  code: '-201',
  message: '用户登录过期'
})

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
  let errorInfo = null

  if (errorName) {
    errorInfo = errorMap.get(errorName)
  }

  // 如果没有对应的错误信息，默认‘未知错误’
  if (!errorInfo) {
    errorName = ApiErrorNames.UNKNOW_ERROR
    errorInfo = errorMap.get(errorName)
  }

  return errorInfo
}

module.exports = ApiErrorNames
