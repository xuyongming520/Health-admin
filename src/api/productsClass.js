import request from '@/utils/request'

export function query({ limit, page }) {
  return request({
    url: '/proClass/selectClassList',
    method: 'post',
    data: {
      pageSize: limit,
      currentPage: page
    }
  })
}

export function insert({ name }) {
  return request({
    url: '/proClass/addClass',
    method: 'post',
    data: {
      name
    }
  })
}

export function queryById(id) {
  console.log(479789)
  return request({
    url: '/proClass/selectClass',
    method: 'get',
    params: {
      classId: id
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/proClass/deletedClass',
    method: 'delete',
    params: {
      id
    }
  })
}

export function update({ pkId, name }) {
  return request({
    url: '/proClass/updateClass',
    method: 'post',
    data: {
      classId: pkId,
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

