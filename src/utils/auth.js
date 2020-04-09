import Cookies from 'js-cookie'

const sessionIDKey = 'admin-SessionID';

export function getSessionID(){
    return Cookies.get(sessionIDKey)
}

export function setSessionID(sessionID){
    return Cookies.set(sessionIDKey,sessionID)
}

export function removeSessionID(){
    return Cookies.remove(sessionIDKey)
}