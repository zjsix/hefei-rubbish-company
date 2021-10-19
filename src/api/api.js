import request from '@/untils/axios'

export function getCompany(data) {
  return request({
    url: '/getCompany',
    method: 'post',
    data
  })
}

export function addCompany(data) {
  return request({
    url: '/addCompany',
    method: 'post',
    data
  })
}


export function addDescription(data) {
  return request({
    url: '/addDescription',
    method: 'post',
    data
  })
}

export function addDoubt(data) {
  return request({
    url: '/addDoubt',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/getInfo',
    method: 'post',
    data
  })
}
