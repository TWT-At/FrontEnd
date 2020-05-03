import request from '../utils/request'

export function adminLogin(data) {
    return request({
        url:'/api/admin',
        method: 'post',
        data
    })
}