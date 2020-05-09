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
        headers: {'action': 'modify basic information'},
    })
}

export function uploadHead(data){
    return request({
        url:'/api/user/UpdateImage',
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data',
                'action': 'modify basic information'
                },
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
        headers: {'action': "get users'message"},
    })
}

export function getComplex(data){
    return request({
        url:'/api/user/GetComplex',
        method: 'POST',
        data,
        headers: {'action': "get users'message"},
    })
}

export function getMessage(){
    return request({
        url:'/api/user/GetMessage',
        method: 'GET',
        headers: {'action': 'receive message'},
    })
}

export function UpdateRead(data){
    return request({
        url:'/api/user/UpdateRead',
        method: 'POST',
        data,
        headers: {'action': 'receive message'},
    })
}

export function ShowMyProject(){
    return request({
        url:'/api/project/ShowMyProject',
        method: 'GET',
        headers: {'action': 'receive message'},
    })
}