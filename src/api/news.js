import request from '@/utils/request'

export function queryById(id) {
  return request({
    url: '/news/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function queryMainPicture() {
  return request({
    url: '/company/upload/detail',
    method: 'get'
  })
}

export function updateMainPicture({ url, image }) {
  return request({
    url: '/company/news/url',
    method: 'post',
    data: {
      imageId: 0,
      url,
      image
    }
  })
}

export function query({ limit, page, classId, name }) {
  return request({
    url: '/news/list',
    method: 'get',
    params: {
      limit,
      page,
      classId: classId || '0',
      name: name.trim()
    }
  })
}

export function insert({ title, author, content, classId, releaseDate }) {
  return request({
    url: '/news',
    method: 'post',
    data: {
      title,
      author,
      content,
      classId: classId || '0',
      releaseDate
    }
  })
}

export function update({ pkId, title, author, content, classId, releaseDate }) {
  return request({
    url: '/news',
    method: 'put',
    data: {
      pkId,
      title,
      author,
      content,
      classId: classId || '0',
      releaseDate
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/news',
    method: 'delete',
    params: {
      id
    }
  })
}

export function image(file) {
  return request({
    url: '/news/upload',
    method: 'post',
    data: {
      profile: file
    }
  })
}
