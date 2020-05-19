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
        headers: {'action': 'get own project'},
    })
}

export function getOnline(){
    return request({
        url:'/api/user/OnlineStatus',
        method: 'GET',
        headers: {'action': 'get online user'},
    })
}

export function getUserDatum(){
    return request({
        url:'/api/project/GetUserDatum',
        method: 'GET',
        headers: {'action': "get users'message"},
    })
}

export function createProject(data){
    return request({
        url:'/api/project/CreateProject',
        method: 'POST',
        headers: {'action': "create project"},
        data
    })
}

export function addMember(data){
    return request({
        url:'/api/project/AddMember',
        method: 'POST',
        headers: {
            'action': "manage all projects",
            'Content-Type' : 'application/json'
            },
        data
    })
}

export function ShowSpecifiedProject(data){
    return request({
        url:'/api/project/ShowSpecifiedProject',
        method: 'POST',
        headers: {
            'action': "get own project",
            },
        data
    })
}

export function getMemberDatum(data){
    return request({
        url:'/api/project/GetMemberDatum',
        method: 'POST',
        headers: {
            'action': "get own project",
            },
        data
    })
}

export function createTask(data){
    return request({
        url:'/api/project/CreateTask',
        method: 'POST',
        headers: {
            'action': "get own project",
            },
        data
    })
}

export function createOtherTask(data){
    return request({
        url:'/api/project/CreateOtherTask',
        method: 'POST',
        headers: {
            'action': "manage all projects",
            },
        data
    })
}

export function deleteMember(data){
    return request({
        url:'/api/project/DeleteMember',
        method: 'POST',
        headers: {
            'action': "manage all projects",
            },
        data
    })
}

export function transferLeader(data){
    return request({
        url:'/api/project/TransferLeader',
        method: 'POST',
        headers: {
            'action': "manage all projects",
            },
        data
    })
}

export function finsihProject(data){
    return request({
        url:'/api/project/FinsihProject',
        method: 'POST',
        headers: {
            'action': "manage all projects",
            },
        data
    })
}



