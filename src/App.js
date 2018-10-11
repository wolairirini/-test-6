import React,{Component} from "react";
import {HashRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import {notification,Button,message,Modal} from 'antd';
import axios from "axios";
import {Provider} from "react-redux";
import store from "./store";
import Layout from "./pages/layout";
import Login from "./pages/login";
const {confirm} = Modal;

export default class App extends Component{
    render(){
        let isLogin=sessionStorage.getItem("userinfo")?sessionStorage.getItem("userinfo"):false;
        
        return(
            <Provider store={store} >
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route  path="/" render={ (props)=>!isLogin?(<Redirect to={{pathname: "/login",state: { from:props.location }}}/>):(<Layout/>)}/>

                    </Switch>
                </Router>
            </Provider>
        )
    }
    componentDidMount(){
        let reboot=sessionStorage.getItem("reboot");
        if(reboot){
            notification.open({
                duration:0,
                key:'reboot',
                placement:'topLeft',
                message: '您当前的配置修改，需要设备重启后才能生效！',
                description: (<p>您当前的配置修改，需要设备重启后才能生效！<Button type={'primary'} onClick={Reboot}>立即重启</Button></p>),
            });
        }
    }
}



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