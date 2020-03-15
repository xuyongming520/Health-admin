import request from '@/utils/request'

export function query({ limit, page, name, author, publishers }) {
  return request({
    url: '/books/information/list',
    method: 'post',
    data: {
      limit, page, name, author, publishers
    }
  })
}

export function insert({ classId, name, publishers, author, num, image }) {
  console.log(789)
  return request({
    url: '/books/information',
    method: 'post',
    data: {
      classId, name, publishers, author, num, image
    }
  })
}

export function queryById(id) {
  return request({
    url: '/books/information/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function update({ pkId, classId, name, publishers, author, num, image }) {
  console.log('asd')
  console.log(image)
  return request({
    url: '/books/information',
    method: 'put',
    data: {
      pkId, classId, name, publishers, author, num, image
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/books/information',
    method: 'delete',
    params: {
      id
    }
  })
}

// export function query({ limit, page, name }) {
//   return request({
//     url: '/books/class/list',
//     method: 'post',
//     data: {
//       limit,
//       page,
//       name
//     }
//   })
// }

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

