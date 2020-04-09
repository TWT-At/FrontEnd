import {login} from '../api/user'
import {getSessionID} from '../utils/auth'
import { Message } from 'element-ui'

const state = {
    sessionID: getSessionID(),
}

const mutations = {
    SET_SESSIONID:(state,id) => {
        state.sessionID = id
    }
}

const actions = {
    login({commit},userInfo){
        const {username,password} = userInfo;
        return new Promise((resolve,reject) => {
            login({email:username.trim(),password:password})
                .then(resData => {
                    if(resData.data === null){
                        Message({
                            message:resData["msg"],
                            type:"error",
                            duration:5000
                        });
                        reject(resData['msg'])
                    }
                    const {data} = resData;
                    commit('SET_SESSIONID',data.sessionID);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
