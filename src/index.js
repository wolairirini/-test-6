import React from 'react';
import ReactDOM from 'react-dom';
import "./index.less";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import {notification,message} from 'antd';
import Reboot from "./components/reboot";

// 正则校验
global.exp = {
    // DNS,IP
    ip:/(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
    mac:/(([a-f0-9]{2}:)|([a-f0-9]{2}-)){5}[a-f0-9]{2}/,
    netmask:/^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/,
    domain:/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
}
// 全局message设置
message.config({
    top: '50%',
    duration:2,
    maxCount:1
});

// 全局axios设置
axios.defaults.baseURL = 'http://jxos.net';
// axios.defaults.withCredentials = true;
// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // console.log(sessionStorage);
        var xtoken = sessionStorage.getItem('userinfo')?JSON.parse(sessionStorage.getItem('userinfo')).token:null;
        if(xtoken){
            config.headers['Authorization'] = xtoken;
        }
        if(config.method=='post'){
            config.data = {
                ...config.data,
                _t: Date.parse(new Date())/1000,
            }
        }else if(config.method=='get'){
            config.params = {
                _t: Date.parse(new Date())/1000,
                ...config.params
            }
        }
        return config
    }
)

//添加响应拦截器
axios.interceptors.response.use(res => {
    // console.log(res.data);
    // console.log(res)
    // 判断后台返回数据携带的请求码
    if (res.data.meta.code===0) {
        if(res.data.meta.reboot){
            sessionStorage.setItem('reboot',true);
            setTimeout(() => {
                notification.open({
                    duration:0,
                    key:'reboot',
                    placement:'topLeft',
                    message: '您当前的配置修改，需要设备重启后才能生效！',
                    description: (<Reboot/>),
                });
            }, 500);
        }
        // 成功
        // console.log(res);
        return res.data.data;
    }else if(res.data.meta.code===401){
        // token失效或者过期
        throw Error(res.data.meta.msg || 'token无效或过期');
    }else {
        // 其他报错
        const err = new Error(res.data.meta.msg || '服务异常')
        err.res = res;
        throw err;
    }
},err=>{
    // 请求失败
    console.dir(err);
    if(err.config.url===axios.defaults.baseURL+"/api/usr/need_reboot"){
        return Promise.reject(err);
    }else if(err.config.url===axios.defaults.baseURL+"/api/usr/nginx_ready"){
        return Promise.reject(err);
    }

    sessionStorage.removeItem('userinfo');
    message.error('请求失败，请重新登录');
    window.location.href='/#/login';
    return Promise.reject(err);
    
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import "./components/EditableCell";
