import {login} from '../../api/user'
import {getSessionID,setSessionID} from '../../utils/auth'
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
        const {student_id,password} = userInfo;
        return new Promise((resolve,reject) => {
            login({student_id:student_id,password:password})
                .then(resData => {
                    if(resData.data === null){
                        Message({
                            message:resData["msg"],
                            type:"error",
                            duration:5000
                        });
                        reject(resData['msg'])
                    }
                    const {data} = resData.data;
                    commit('SET_SESSIONID',data.session_id);
                    setSessionID(data.session_id);
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
