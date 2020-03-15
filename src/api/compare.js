import request from '@/utils/request'

export function query() {
  return request({
    url: '/company/detail?id=1',
    method: 'get'
  })
}

export function updateInfo(data) {
  return request({
    url: '/company',
    method: 'put',
    data: {
      pkId: 1,
      name: data.name,
      telphone: data.telphone,
      address: data.address,
      email: data.email,
      introduce: data.introduce
    }
  })
}

export function createTime(data) {
  return request({
    url: '/company/develop',
    method: 'post',
    data
  })
}

export function updateTime(data) {
  return request({
    url: '/company/develop',
    method: 'put',
    data
  })
}

export function deleteTime(id) {
  return request({
    url: '/company/develop',
    method: 'delete',
    params: {
      id
    }
  })
}
