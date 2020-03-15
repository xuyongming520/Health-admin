import request from '@/utils/request'

export function query({ limit, page, name }) {
  return request({
    url: '/books/class/list',
    method: 'post',
    data: {
      limit,
      page,
      name
    }
  })
}

export function insert({ name }) {
  return request({
    url: '/books/class',
    method: 'post',
    data: {
      name
    }
  })
}

export function queryById(id) {
  console.log(479789)
  return request({
    url: '/books/class/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/books/class',
    method: 'delete',
    params: {
      id
    }
  })
}

export function update({ pkId, name }) {
  return request({
    url: '/books/class',
    method: 'put',
    data: {
      pkId,
      name
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

