import OrderModel from '../models/order'

class OrderController {
  // 测试列表
  static async testList(ctx) {
    let data = await OrderModel.testList()
    ctx.success({
      data: data
    })
  }
}

module.exports = OrderController
