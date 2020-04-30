import Sequelize from 'sequelize'
import database from '../env'

console.log('process.env.NODE_ENV=db---' + process.env.NODE_ENV)
console.log(database[process.env.NODE_ENV], '******database')

let configInfo = database[process.env.NODE_ENV]
// // 预发环境
const config = {
  // 数据库
  database: 'healthy_life_management',
  // 用户名
  username: configInfo.username,
  // 密码
  password: configInfo.password,
  // 使用哪个数据库程序
  dialect: 'mysql',
  // 地址
  host: configInfo.dbHost,
  // 端口
  port: configInfo.dbPort,
  // 连接池
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false // 取消Sequelize自动给数据表加入时间戳（createdAt 以及 updatedAt）
  },
  timezone: '+08:00' // Mysql时区与Node时区不一致问题
}
console.log(config, 'config')
const HealthyDB = new Sequelize(config)

module.exports = {
  HealthyDB // 将HealthyDB暴露出接口，方便Model调用
}
