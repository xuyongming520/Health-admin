import request from '@/utils/request'

export function queryById(id) {
  return request({
    url: '/users/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function query({ limit, page }) {
  console.log({ limit, page })
  return request({
    url: '/user/selectUserList',
    method: 'post',
    data: {
      pageSize: limit,
      currentPage: page
    }
  })
}

// export function insert({ uniqueId, classId, name, password, img, balance }) {
//   return request({
//     url: '/users/register',
//     method: 'post',
//     data: {
//       uniqueId, classId: classId || null, name, password, img, balance
//     }
//   })
// }

export function update({ pkId, uniqueId, classId, name, password, img, balance }) {
  console.log(uniqueId)
  return request({
    url: '/users',
    method: 'put',
    data: {
      pkId, uniqueId, classId: classId || null, name, password, img, balance
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/users',
    method: 'delete',
    params: {
      id
    }
  })
}
