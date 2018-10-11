import React from 'react';
import ReactDOM from 'react-dom';
import "./index.less";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import {notification,Modal,message,Button} from 'antd';
const {confirm} = Modal

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
                    description: (<p>您当前的配置修改，需要设备重启后才能生效！<Button type={'primary'} onClick={Reboot}>立即重启</Button></p>),
                });
            }, 500);
        }
        // 成功
        // console.log(res)
        return res.data.data;
    }else if(res.data.meta.code===401){
        // token失效或者过期
        sessionStorage.removeItem('userinfo');
        window.location.href='/login';
        throw Error(res.data.meta.msg || 'token无效或过期');
    }else {
        // 其他报错
        throw Error(res.data.meta.msg || '服务异常');
    }
},err=>{
    if(err.response.status===401){
        // token失效或者过期
        sessionStorage.removeItem('userinfo');
        window.location.href='/#/login';
    }
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function Reboot(){
    // notification.close('reboot');
    confirm({
        className:'confirm',
        title: '确认重启？',
        okText:'确定',
        cancelText:'取消',
        maskClosable:false,
        onOk() {
            sessionStorage.removeItem('reboot');
            return axios({
                url:'/api/system/reboot',
            }).then(data=>{
                message.success('重启成功');
                setTimeout(()=>{
                    window.location.href='/#/login';
                },200);
            }).catch(err=>{
                console.log(err);
                message.error(err.message);
            })
        },
        onCancel() {
        },
    });
}