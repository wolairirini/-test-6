import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import {get_wan_status,get_svpn_status,get_lan_status,get_system_status} from "./action";
import img_port_active from '../../img/index/port_active.png';
import img_eye from '../../img/index/eye.png';
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
                            <div className='ibox_d'>
                                <img className="icon" src={require('../../img/index/icon_ww.png')}/>
                            </div>
                            <h2 className="title">外网信息</h2>
                        </div>
                        <div className={!connected?'content error':'content'} style={{position:'relative'}}>
                            <p title={data.ipaddr}>WAN口IP：{data.ipaddr}</p>
                            <p title={data.dns?data.dns.length>0?data.dns[0]:'':''}>DNS：{data.dns?data.dns.length>0?data.dns[0]:'':''}</p>
                            <p className="xy" title={data.proto}>协议类型：{data.proto==='dhcp'?'自动获取':data.proto==='pppoe'?'宽带拨号':data.proto==='static'?'静态地址':''}</p>
                            <span className={!connected?'show':'hide'} style={{position:'absolute',left:0,top:'1.2rem',color:'@color_error',fontSize:'.62rem'}}>{data.detail}</span>
                        </div>
                        <span className='wx_link'><img src={img_eye}/><Link to="/infos/wan">查看详情</Link></span>
                    </div>
                </div>
                <div className="wx">
                    <div>
                        <div className="ibox">
                            <div className='ibox_d'>
                                <img className="icon" src={require('../../img/index/icon_wx.png')}/>
                            </div>
                            <h2 className="title">内网信息</h2>
                        </div>
                        <ul>
                            <li className="ssid"><p><span>2.4G SSID：</span>{data_lan?data_lan.ssid_24g:''}</p><p><span>5G SSID：</span>{data_lan?data_lan.ssid_5g:''}</p></li>
                            <li className='ip'><p>DHCP容量：{data_lan?data_lan.limit:''}</p><p>已连终端数：{data_lan?data_lan.lease_num:''}</p><div><span className='wx_link'><img src={img_eye}/><Link to="/infos/ip">查看详情</Link></span></div></li>
                            <li><p>LAN口IP地址：{data_lan?data_lan.ipaddr:''}</p></li>
                        </ul>
                    </div>
                </div>
                <div className="js">
                    <div>
                        <div className='icon_box'>
                            <div className='ibox_d'>
                                <img className="icon" src={require('../../img/index/icon_js.png')}/>
                            </div>
                            <h2 className="title">游戏加速</h2>
                        </div>
                        <div className="content">
                            <p>加速状态：{data_svpn.running?'已开启':'未开启'}</p>
                            <p>当前线路：{data_svpn.line}</p>
                        </div>
                    </div>
                    <span><img src={img_eye}/><Link to="/infos/js">查看详情</Link></span>
                </div>
                <div className="wx">
                    <div>
                        <div className="ibox">
                            <div className='ibox_d'>
                                <img className="icon" style={{width:"1.688888888888887rem",height:"1.599999999999998rem"}} src={require('../../img/index/icon_sys.png')}/>
                            </div>
                            <h2 className="title"> 系统信息</h2>
                        </div>
                        <ul>
                            <li>LAN&nbsp;&nbsp; MAC地址：{data_system?data_system.lmac:''}</li>
                            <li>WAN MAC地址：{data_system?data_system.wmac:''}</li>
                            <li>系统时间：{system_time}</li>
                            <li>运行时间：{running_time}</li>
                        </ul>
                    </div>
                </div>
                <div className="port">
                    <div>
                        <div className='icon_box'>
                            <div className='ibox_d'>
                                <img className="icon" src={require('../../img/index/icon_port.png')}/>
                            </div>
                            <h2 className="title">端口状态</h2>
                        </div>
                        <ul className="content">
                            <li className="active">
                                <img src={img_port_active}/>
                                <p>WAN</p>
                                <p>(1G)</p>
                            </li>
                            <li>
                                <img src={img_port_active}/>
                                <p>LAN1</p>
                            </li>
                            <li>
                                <img src={img_port_active}/>
                                <p>LAN2</p>
                            </li>
                            <li>
                                <img src={img_port_active}/>
                                <p>LAN3</p>
                            </li>
                            <li>
                                <img src={img_port_active}/>
                                <p>LAN4</p>
                            </li>
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