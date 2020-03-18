import request from '@/utils/request'

export function query({ limit, page }) {
  console.log({ limit, page })
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

export function update({ pkId, name, shortIntroduce, longIntroduce, marketTime, model, classId, image, company, video }) {
  return request({
    url: '/products',
    method: 'put',
    data: {
      pkId,
      name,
      shortIntroduce,
      longIntroduce,
      marketTime,
      model,
      image,
      company,
      classId: classId || '1',
      video
    }
  })
}

