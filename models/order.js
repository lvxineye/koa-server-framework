class OrderModel {
  // 小程序端埋点增加记录
  static testList() {
    // return await UserRecord.findAll({where: {user_id: 168}}).then(testList => {
    return [{
      'id': 1,
      'money': '29.99',
      'unit': '元'
    }, {
      'id': 2,
      'money': '39.99',
      'unit': '元'
    }];
  }
}

module.exports = OrderModel
