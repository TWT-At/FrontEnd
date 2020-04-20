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
        if(!config['content-Type']) return qs.stringify(oldData);
            switch (config['content-Type']) {
                case 'multipart/form-data;charset=utf-8':
                    return oldData;
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
        if(response.request.responseType === 'blob'){
            return response
        }
        const data=response.data;
        window.console.log(data);
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
    }else if(response.status === 500){
        Message({
            message: "系统错误，请联系管理员修复",
            type: "error",
            duration:5000
        });
    }
})

export default service

