var Eureka = require('eureka-client').Eureka

const ip = 'localhost' //getIp(); //获取本地ip

let serviceName = 'healthy-management-nodejs-server' // eureka 服务注册的服务名

let database = require('./env')
let configInfo = database[process.env.NODE_ENV]

let port = configInfo.port // 对应服务的端口号
let eureka_address = configInfo.eurekaAddress
let eureka_port = configInfo.eurekaPort
let eureka_username = configInfo.eurekaUsername
let eureka_password = configInfo.eurekaPassword
console.log('***********eureka*****' + configInfo.eureka_username)

const client = new Eureka({
  instance: {
    instanceId: `${ip}:${serviceName.toLowerCase()}:${port}`, //eureka服务的实例id
    app: serviceName,
    hostName: ip,
    ipAddr: ip,
    statusPageUrl: `http://${ip}:${port}/info`, // spring admin 注册心跳
    healthCheckUrl: `http://${ip}:${port}/health`, // eureka 注册心跳
    port: {
      $: port,
      '@enabled': 'true',
    },
    vipAddress: serviceName, // Important, otherwise spring-apigateway cannot find instance of book-service
    // secureVipAddress: 'book-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: `${eureka_username}:${eureka_password}@${eureka_address}`,
    port: eureka_port,
    servicePath: '/eureka/apps/'
  },
})

client.logger.level('debug')
//********************  测试监听  ********************//
// let updatedListener = function(apps) {
//   console.log("更新：" + JSON.stringify(apps));
// }
// client.onUpdated(updatedListener);
client.start(function(error) {
  console.log(error || 'eureka启动成功！')
})
//
// client.stop(function(error) {
// console.log(error || '停止成功！');
// });
