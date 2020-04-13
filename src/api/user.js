import request from '../utils/request'

export function login(data) {
    return request({
        url:'/api/save',
        method: 'post',
        data
    })
}

export function getWeekly(data) {
    return request({
        url:'/api/GetMessage',
        method: 'get',
        data
    })
}