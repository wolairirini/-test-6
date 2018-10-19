import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal,message,notification,Progress} from "antd";
import axios from "axios";
const confirm = Modal.confirm;
@connect(
    state=>({source:state.source}),
    dispatch=>bindActionCreators({},dispatch)
)

export default class SystemToolsRestartRouter extends Component{
    constructor(props){
        super(props);
        this.state={
            process_status:'normal',
            process_percent:0,
            process_visable:false,
        }
    }
    render(){
        let {process_status,process_percent,process_visable} = this.state;
        return(
            <div className="col">
                <img style={{width:'0.9333333333333324rem',height:'0.9333333333333324rem'}} src={require('../../img/systemtools/icon_restart.png')}/>
                <h2>重启路由：</h2>
                <a className="btn" onClick={()=>this.showConfirm(this)} >立即重启</a>
                <Modal
                    className="modal_process"
                    title={<h2 style={{color:'#5FC7CE',fontSize:'14px',textAlign:'center'}}>正在重启路由器……</h2>}
                    visible={process_visable}
                    footer={null}
                    closable={false}
                    maskClosable ={false}
                >
                    <Progress status={process_status} percent={process_percent}/>
                </Modal>
            </div>
        )
    }
    showConfirm(_this){
        let {process_percent} = _this.state;
        confirm({
            className:'confirm',
            title: '确认重启？',
            okText:'确定',
            cancelText:'取消',
            maskClosable:false,
            onOk() {
                return axios({
                    url:'/api/system/reboot',
                }).then(data=>{
                    // message.warn('正在重启,请等待路由器重启完毕');
                    sessionStorage.removeItem('userinfo');
                    sessionStorage.removeItem('reboot');
                    _this.setState({
                        process_visable:true
                    });
                    let time = 0;
                    let timer = setInterval(()=>{
                        time++;
                        if(time>=120){
                            clearInterval(timer);
                            _this.setState({
                                process_percent:100,
                                process_status:'active',
                                process_visable:false
                            });
                            message.warn('连接超时，请重新登录！');
                            setTimeout(() => {
                                notification.close('reboot');
                                window.location.href='/#/login';
                            }, 200);
                            return;
                        }else if(time>=50){
                            axios({
                                url:'/api/usr/nginx_ready'
                            }).then(data=>{
                                clearInterval(timer);
                                _this.setState({
                                    process_percent:100,
                                    process_status:'success',
                                    process_visable:false
                                });
                                message.success('重启成功，请重新登录！');
                                setTimeout(() => {
                                    notification.close('reboot');
                                    window.location.href='/#/login';
                                }, 200);
                                return;
                            }).catch(err=>{
                                console.log(err);
                            });
                        }
                        process_percent=Number((time/120*100).toFixed(1));
                        _this.setState({
                            process_percent
                        });
                    },1000)
                }).catch(err=>{
                    console.log(err);
                    message.error(err.message);
                })
            },
            onCancel() {
            },
        });
    }
}