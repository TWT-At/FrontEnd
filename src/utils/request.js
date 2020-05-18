 import axios from 'axios'
 import {Message} from 'element-ui'
 import {getToken} from './auth'
 import store from '../store/index'
 import qs from 'querystring'
 import {toLogin} from '../router'

const service = axios.create({
    baseURL:'',
    //baseURL: process.env.VUE_APP_SERVER_URL,
    transformRequest:[(oldData,config) => {
        if(!config["Content-Type"]) {
            return qs.stringify(oldData);
        }
            switch (config["Content-Type"]) {
                case "multipart/form-data":
                    return oldData;
                case "application/json":
                    return JSON.stringify(oldData);
                default:
                    return qs.stringify(oldData);
            }
    }],
    timeout: 60000,
    withCredentials:true,
});

service.interceptors.request.use(config =>{
    if(store.getters.token) {
        config.headers['token']=getToken();
    }
    return config
},error => {
    return Promise.reject(error);
}); 

service.interceptors.response.use(response =>{
    if(response.status === 200){
        if(response.request.responseType ===  'blob'){
            return response
        }else if(response.request.responseType ===  'arraybuffer'){
            return response
        }
        const data=response.data;
        switch (data.error_code){
            case 0:
                return response;
            case 401:
                toLogin();
                Message({
                    message:'登录过期,请重新登录',
                    type:"error",
                    duration:5000
                });
                return Promise.reject(data["error_code"]);
            case 1:
                return Promise.reject(data["error_code"]);
            default:
                Message({
                    message: "系统发生错误",
                    type: "error",
                    duration:5000
                });
                return Promise.reject(data["error_code"])
        }
    }else if(response.status == 500){
        Message({
            message: "管理员错误，请联系系统修复",
            type: "error",
            duration:5000
        });
    }
})

export default service

