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

export function getInfo(){
    return request({
        url:'/api/getinfo',
        method: 'get',
    })
}

export function getHead(){
    return request({
        url:'/api/user/GetAvatar',
        method: 'get',
        responseType: 'arraybuffer',
    })
}

export function uploadHead(data){
    return request({
        url:'/api/user/UpdateImage',
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data
    })
}

export function changePassword(data){
    return request({
        url:'/api/user/password',
        method: 'post',
        data
    })
}

export function getGrouper(group){
    return request({
        url:'/api/user/Get'+group,
        method: 'get',
    })
}

export function getComplex(data){
    return request({
        url:'/api/user/GetComplex',
        method: 'POST',
        data
    })
}

export function getMessage(){
    return request({
        url:'/api/user/GetMessage',
        method: 'GET'
    })
}

export function UpdateRead(data){
    return request({
        url:'/api/user/UpdateRead',
        method: 'POST',
        data
    })
}