import request from '@/utils/request'

export function queryById(id) {
  return request({
    url: '/authority',
    method: 'get',
    params: {
      id
    }
  })
}

export function query({ limit, page }) {
  return request({
    url: '/authority/list',
    method: 'post',
    data: {
      limit,
      page
    }
  })
}

export function insert({ name, number, lendTime }) {
  return request({
    url: '/authority',
    method: 'post',
    data: {
      name, number, lendTime
    }
  })
}

export function update({ pkId, name, number, lendTime }) {
  return request({
    url: '/authority',
    method: 'put',
    data: {
      pkId, name, number, lendTime
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/authority',
    method: 'delete',
    params: {
      id
    }
  })
}
