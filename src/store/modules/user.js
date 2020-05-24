import {login} from '../../api/user'
import {getInfo} from '../../api/user'
import {getToken,setToken} from '../../utils/auth'
import { Message } from 'element-ui'

const state = {
    token: getToken(),
    userInfo:null,
    projDetailID:null,
    projInfo:null,
    weekInfo:null,
}


const mutations = {
    SET_TOKEN:(state,id) => {
        state.token = id
    },
    SET_USERINFO:(state,userInfo) => {
        state.userInfo=userInfo
    },
    SET_PROJDETAILID:(state,id) => {
        state.projDetailID = id
    },
    SET_PROJINFO:(state,info) => {
        state.projInfo = info
    },
    SET_WEEKINFO:(state,info) => {
        state.weekInfo = info
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
                    resolve(data.token)
                }).catch(error => {
                    Message({
                        message:"用户名或者密码错误",
                        type:"error",
                        duration:5000
                    });
                    reject(error)
                })
        })
    },
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const {data} = response.data;
                commit('SET_USERINFO', data);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    setProjDetailID({commit},id){
        commit('SET_PROJDETAILID', id);
    },
    setProjInfo({commit},info){
        commit('SET_PROJINFO', info);
    },
    setWeekInfo({commit},info){
        commit('SET_WEEKINFO', info);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
