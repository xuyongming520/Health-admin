
import request from '@/utils/request'

export function queryById(id) {
  return request({
    url: '/case/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function query({ limit, page, name }) {
  return request({
    url: '/case/list',
    method: 'get',
    params: {
      limit,
      page,
      name: name.trim()
    }
  })
}

export function insert({ title, author, content, releaseTime, cover, video }) {
  return request({
    url: '/case',
    method: 'post',
    data: {
      title,
      author,
      content,
      releaseTime,
      cover,
      video
    }
  })
}

export function update({ pkId, title, author, content, releaseTime, cover, video }) {
  return request({
    url: '/case',
    method: 'put',
    data: {
      pkId,
      title,
      author,
      content,
      releaseTime,
      cover,
      video
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/case',
    method: 'delete',
    params: {
      id
    }
  })
}
