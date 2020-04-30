// 192.168.11.217     6379   nchhdtea

import Redis from 'ioredis'

const redis = {
  port: 6379, // Redis port
  host: '192.168.11.217', // Redis host
  password: 'nchhdtea',
  // prefix: 'pon:', //存诸前缀
  ttl: 60 * 60 * 23, //过期时间
  family: 4,
  db: 0
}
const newRedis = new Redis(redis)

function get(key) {
  return new Promise(function(resolve, reject) {
    newRedis.get(key, function(err, result) {
      if (err) reject(err)
      console.log(result)
      resolve(result);
    });
  })
};

//newRedis.set('a',"haha")
module.exports.newRedis = newRedis
module.exports.RedisGet = get
// export default { newRedis, get }
