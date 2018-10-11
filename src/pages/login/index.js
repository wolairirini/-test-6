import React,{Component} from "react";
import {} from "react-router-dom";
import Header from "../header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {login} from "./action";
import axios from "axios";
import {Spin} from 'antd';

@connect(
    state=>({loginInfo:state.loginInfo,loading_login:state.loading_login}),
    dispatch=>bindActionCreators({login},dispatch)
)

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            password:'',
            reboot:null,
        }
    }
    render(){
        const {loading_login} = this.props;
        return(
            <div className="container">
                <Header/>
                <Spin style={{top:'30%'}} spinning={loading_login} size='large' tip="Loading...">
                    <form className="login" onSubmit={event=>this.handleSubmit(event)} >
                        <div className="side">
                            <p className="describe">关注官方微信</p>
                            <p className="describe">下载极迅APP&nbsp;<a href="javascript:void(0)">开启加速</a></p>
                            <img src={require('../../img/index/erweima.png')}/>
                            <p className="tips">扫一扫下载极讯APP</p>
                        </div>
                        <div className="article">
                            <h2 className="logo"><img src={require('../../img/login/logo.png')} /></h2>
                            <h3>极迅智能路由器登录</h3>
                            <div className="input-group">
                                <label>登录密码</label>
                                <input required disabled={loading_login} name='password' onChange={(e)=>this.handleChange(e.target.value)} type="password" />
                            </div>
                            <div className="btns">
                                <button disabled={loading_login} type="submit" className="btns-ok">确定</button>
                                <button disabled={loading_login} type="reset" className="btns-reset">取消</button>
                            </div>
                        </div>
                    </form>
                </Spin>
            </div>
        )
    }
    handleSubmit(e){
        e.preventDefault?e.preventDefault():e.returnValue=false;
        
        const {login} = this.props;
        let {password} = this.state;
        let data = {
            password
        };
        login(data);
    }
    handleChange(value){
        this.setState({
            password:value
        })
    }
    componentDidMount(){
        axios({url:'/api/usr/need_reboot'}).then(data=>{
            if(data.reboot){
                sessionStorage.setItem('reboot',true);
            }else{
                sessionStorage.removeItem('reboot');
            };
        }).catch(err=>{
            console.dir(err);
        });
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (Object.keys(nextProps.loginInfo).length > 0) {
          if (nextProps.loginInfo.isLogin) {
            // 登录成功
            sessionStorage.setItem(
              "userinfo",
              JSON.stringify(nextProps.loginInfo)
            );
            axios.defaults.headers = Object.assign({},axios.defaults.headers,{token:nextProps.loginInfo.token});

            setTimeout(() => {
                let RedirectUrl = nextProps.location.state
                ? nextProps.location.state.from.pathname
                : "/";
                window.location.href=RedirectUrl;
            }, 200);
          } else {
   
          }
        }
    }
}