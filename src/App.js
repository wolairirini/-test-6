import React,{Component} from "react";
import {HashRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import {notification,Button} from 'antd';
import {Provider} from "react-redux";
import store from "./store";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Reboot from "./components/reboot";

export default class App extends Component{
    render(){
        let isLogin = sessionStorage.getItem("userinfo")?sessionStorage.getItem("userinfo"):false;
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
                description: (<Reboot/>),
            });
        }
    }
}


