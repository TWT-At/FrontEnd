import Cookies from 'js-cookie'

const tokenKey = 'token';

export function getToken(){
    return Cookies.get(tokenKey)
}

export function setToken(sessionID){
    return Cookies.set(tokenKey,sessionID)
}

export function removeToken(){
    return Cookies.remove(tokenKey)
}