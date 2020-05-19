console.log('process.env.NODE_ENV=' + process.env.NODE_ENV, 'process.env.PORT=' + process.env.PORT)

const port = process.env.PORT
module.exports = {
  dev: {
    username: 'dtea_app', //用户名
    password: 'GIHI7os=', //密码
    dbHost: '192.168.11.217', // 数据库地址
    dbPort: 3316, // 数据库端口号
    port: port, // 接口服务端口号
    eurekaAddress:'192.168.11.217',
    eurekaPort:'8761',
    eurekaUsername:'dtea',
    eurekaPassword: 'dtea2018',
  },
  beta:  {
    username: 'dtea_app', //用户名
    password: 'GIHI7os=', //密码
    dbHost: '172.16.35.95', // 数据库地址
    dbPort: 3316, // 数据库端口号
    port: port, // 接口服务端口号
  },
  production:  {
    username: 'healthy_online', //用户名
    password: 'jU1#X4Ua!', //密码
    dbHost: 'rm-bp1nsq7zu3m925070.mysql.rds.aliyuncs.com', // 数据库地址
    dbPort: 3306, // 数据库端口号
    port: port, // 接口服务端口号
  }
}
