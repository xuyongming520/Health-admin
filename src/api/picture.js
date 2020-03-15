import request from '@/utils/request'

export function query() {
  return request({
    url: '/company/upload/list',
    method: 'get'
  })
}

export function insert(data) {
  return request({
    url: '/company/upload',
    method: 'post',
    data
  })
}

export function deleteById(id) {
  return request({
    url: '/company/upload',
    method: 'delete',
    params: {
      id
    }
  })
}
