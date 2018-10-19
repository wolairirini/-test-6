import React,{Component} from "react";
import {} from "./action";
import axios from "axios";
import {Modal,message,Button,Progress,notification} from 'antd';
const {confirm} = Modal;

export default class Reboot extends Component{
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
            <p className='component_reboot'>
                您当前的配置修改，需要设备重启后才能生效！
                <Button type={'primary'} onClick={()=>this.reboot()}>立即重启</Button>
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
            </p>
        )
    }
    reboot(){
        let {process_percent} = this.state;
        let _this = this;
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
                    // if(!data){
                    //     return;
                    // }
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
                                // console.dir(err);
                                return;
                            });
                        }
                        process_percent=Number((time/120*100).toFixed(1));
                        _this.setState({
                            process_percent
                        });
                    },1000)
                })
            },
            onCancel() {
            },
        });
    }
}

