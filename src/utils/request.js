 import axios from 'axios'
 //import {message} from 'element-ui'
 import {getToken} from './auth'
 import store from '../store/index'
 import qs from 'querystring'
 //import {toError,toLogin} from '../router'

const service = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    transformRequest:[(oldData,config) => {
        if(!config['content-Type']) return qs.stringify(oldData);
            switch (config['content-Type']) {
                case 'multipart/form-data;charset=utf-8':
                    return oldData;
                default:
                    return qs.stringify(oldData);
            }
    }],
    timeout: 60000
});

service.interceptors.request.use(config =>{
    if(store.getters.token) {
        config.headers['_token']=getToken();
    }
    return config
},error => {
    return Promise.reject(error);
}); 

/*service.interceptors.response.use(response =>{
    if(response.status === 200){
        if(response.request.responseType === 'blob'){
            return response.data
        }
        const data=response.data;
        switch (data["code"]){
            case "200":
                return data;
            case "10001":
                toLogin();
                Message({
                    message:'${data["msg"]},请重新登录',
                    type:"error",
                    duration:5000
                });
                return Promise.reject(data["msg"]);
            case "201":
                return Promise.reject(data["msg"]);
            default:
                Message({
                    message: data["msg"],
                    type: "error",
                    duration:5000
                });
                return Promise.reject(data["msg"])
        }
    }else if(response.status === 500){
        Message({
            message: "系统错误，请联系管理员修复",
            type: "error",
            duration:5000
        });
    }
})
*/
export default service

