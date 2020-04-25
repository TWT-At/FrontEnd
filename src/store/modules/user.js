import {login} from '../../api/user'
import {getToken,setToken} from '../../utils/auth'
import { Message } from 'element-ui'

const state = {
    token: getToken(),
    userInfo:null,
}


const mutations = {
    SET_TOKEN:(state,id) => {
        state.token = id
    },
    SET_USERINFO:(state,userInfo) => {
        state.userInfo=userInfo
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
                    commit('SET_TOKEN',data.token);
                    setToken(data.token);
                    let obj = {
                        name:data.name,
                        group:data.group,
                        student_id:data.student_id,
                        date:data.date,
                        permission:data.permission,
                        group_role:data.group_role,
                        hour:data.hour,
                    };
                    commit('SET_USERINFO',obj);
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
