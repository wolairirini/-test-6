import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Modal,Button,} from 'antd';
import {Link} from 'react-router-dom';
import img_safe from '../../img/index/safe.png';
import img_danger from '../../img/index/danger.png';
import {get_wan_status,get_svpn_status,get_lan_status,get_system_status} from "./action";

@connect(
    state=>({connected:state.home.connected,data:state.home.data,data_lan:state.home.data_lan,data_svpn:state.home.data_svpn,data_system:state.home.data_system}),
    dispatch=>bindActionCreators({get_wan_status,get_lan_status,get_svpn_status,get_system_status},dispatch)
)

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            system_time:'',
            running_time:'',
        }
    }
    render(){
        const {connected,data,data_lan,data_svpn,data_system} = this.props;
        let {system_time,running_time} = this.state;
        return(
            <div className="home">
                <div className="ww">
                    <div>
                        <div className='icon_box'>
                            <img className="icon" src={require('../../img/index/icon_ww.png')}/>
                            <h2 className="title">外网信息</h2>
                        </div>
                        <div className={!connected?'content error':'content'} style={{position:'relative'}}>
                            <p title={data.ipaddr}>外网ip：{data.ipaddr}</p>
                            <p title={data.dns?data.dns.length>0?data.dns[0]:'':''}>DNS：{data.dns?data.dns.length>0?data.dns[0]:'':''}</p>
                            <p title={data.proto}>协议类型：{data.proto==='dhcp'?'自动获取':data.proto==='pppoe'?'宽带拨号':data.proto==='static'?'静态地址':''}</p>
                            <span className={!connected?'show':'hide'} style={{position:'absolute',left:0,top:'1.2rem',color:'#ff1f1f',fontSize:'.62rem'}}>{data.detail}</span>
                        </div>
                    </div>
                    <b className="img_box">
                        <img className="status" src={!connected?img_danger:img_safe} />
                    </b>
                </div>
                <div className="js">
                    <div>
                        <div className='icon_box'>
                            <img className="icon" src={require('../../img/index/icon_js.png')}/>
                            <h2 className="title">加速信息</h2>
                        </div>
                        <div className="content">
                            <p>开启状态：{data_svpn.running?'已开启':'未开启'}</p>
                            <p>当前线路：{data_svpn.line}</p>
                        </div>
                    </div>
                    <a className="btn" onClick={this.showModal}>查看详情</a>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleOk}>确定</Button>,
                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                          ]}
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <div className="wx">
                    <div>
                        <div className="ibox">
                            <img className="icon" src={require('../../img/index/icon_wx.png')}/>
                            <h2 className="title">内网信息</h2>
                        </div>
                        <ul>
                            <li className="ssid"><span>SSID：</span>{data_lan?data_lan.ssid_5g+'(5G),':''}</li>
                            <li className="ssid"><span></span>{data_lan?data_lan.ssid_24g+'(2.4G)':''}</li>
                            <li>内网IP地址：{data_lan?data_lan.ipaddr:''}</li>
                            <li>DHCP容量：{data_lan?data_lan.limit:''}</li>
                            <li className="ip">已联终端数：{data_lan?data_lan.lease_num:''}<span><img src={require('../../img/index/eye.png')}/><Link to="/infos/ip">查看详情</Link></span></li>
                        </ul>
                    </div>
                </div>
                <div className="wx">
                    <div>
                        <div className="ibox">
                            <img className="icon" style={{width:"1.688888888888887rem",height:"1.599999999999998rem"}} src={require('../../img/index/icon_sys.png')}/>
                            <h2 className="title"> 系统信息</h2>
                        </div>
                        <ul>
                            <li>LAN MAC地址：{data_system?data_system.lmac:''}</li>
                            <li>WAN MAC地址：{data_system?data_system.wmac:''}</li>
                            <li>系统时间：{system_time}</li>
                            <li>运行时间：{running_time}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_wan_status,get_lan_status,get_svpn_status,get_system_status} = this.props;
        get_wan_status();
        get_lan_status();
        get_svpn_status();
        get_system_status();

    }
    componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.data_system).length<=0){
            return;
        }
        let data = nextProps.data_system;
        let t1 = 0;
        console.log(data);
        this.get_system_time(data.ctime*1000);
        this.get_up_time(data.uptime*1000);
        clearInterval(this.system_timer);
        this.system_timer = setInterval(()=>{
            t1++;
            // console.log(data.ctime+t1);
            this.get_system_time(data.ctime*1000+t1*1000);
            this.get_up_time(data.uptime*1000+t1*1000);
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.system_timer);
    }
    showModal = () => {
        this.setState({
        //   visible: true,
        });
    }
    
    handleOk = (e) => {
    // console.log(e);
    this.setState({
        visible: false,
    });
    }

    handleCancel = (e) => {
    // console.log(e);
    this.setState({
        visible: false,
    });
    }
    // 系统运行时间
    get_up_time(uptime) {
        let days = parseInt(uptime / (1000 * 60 * 60 * 24));
        let hours = parseInt((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((uptime % (1000 * 60 * 60)) / (1000 * 60));
        // let seconds = (uptime % (1000 * 60)) / 1000;
        if(days>0){
            days = days + " 天 "
        }else{
            days = '';
        }
        if(hours>0){
            hours = hours + "小时 "
        }else{
            hours = '';
        }
        if(minutes >0){
            minutes = minutes+ "分钟";
        }else{
            minutes = '';
        }
        let time = days + hours + minutes;
        this.setState({
            running_time:time
        });
    }

    // 当前时间
    get_system_time(ctime){
        let time;
        let datetime = new Date(ctime);
        let year = datetime.getFullYear();
        let month = datetime.getMonth()+1;//js从0开始取 
        let date = datetime.getDate(); 
        let hour = datetime.getHours(); 
        let minutes = datetime.getMinutes(); 
        let second = datetime.getSeconds();
        
        if(month<10){
        month = "0" + month;
        }
        if(date<10){
        date = "0" + date;
        }
        if(hour <10){
        hour = "0" + hour;
        }
        if(minutes <10){
        minutes = "0" + minutes;
        }
        if(second <10){
        second = "0" + second ;
        }
        time = `${year}-${month}-${date} ${hour}:${minutes}:${second}`;
        this.setState({
            system_time:time
        });
    }
}