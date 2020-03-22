import request from '@/utils/request'

export function query({ limit, page }) {
  return request({
    url: '/orders/selectOrdersList',
    method: 'post',
    data: {
      pageSize: limit,
      currentPage: page
    }
  })
}

export function queryById(id) {
  return request({
    url: '/orders/selectOrders',
    method: 'get',
    params: {
      orderId: id
    }
  })
}

export function update(id, status) {
  return request({
    url: '/orders/updateOrdersStatus',
    method: 'post',
    data: {
      orderId: id,
      status
    }
  })
// export function insert({ name, shortIntroduce, longIntroduce, marketTime, model, classId, image, company, video }) {
//   return request({
//     url: '/products',
//     method: 'post',
//     data: {
//       name,
//       shortIntroduce,
//       longIntroduce,
//       marketTime,
//       model,
//       image,
//       company,
//       classId: classId || '1',
//       video
//     }
//   })
// }
}

