import request from '@/utils/request'

export function query({ limit, page, status }) {
  console.log(status)
  return request({
    url: '/books/list',
    method: 'post',
    data: {
      limit,
      page,
      status
    }
  })
}

export function insert({ infoId, location, count }) {
  return request({
    url: '/books/batch',
    method: 'post',
    data: {
      infoId,
      location,
      count
    }
  })
}

export function queryById(id) {
  return request({
    url: '/books/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function update({ pkId, infoId, status, location }) {
  return request({
    url: '/books',
    method: 'put',
    data: {
      pkId, infoId, status, location
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/books',
    method: 'delete',
    params: {
      id
    }
  })
}
// export function query({ limit, page, name, classId }) {
//   return request({
//     url: '/products/list',
//     method: 'get',
//     params: {
//       limit,
//       page,
//       classId: classId || '0',
//       name: name.trim()
//     }
//   })
// }

