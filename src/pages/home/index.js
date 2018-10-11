import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Modal,Button,} from 'antd';
import {Link} from 'react-router-dom';
import img_safe from '../../img/index/safe.png';
import img_danger from '../../img/index/danger.png';
import {get_wan_status,get_svpn_status,get_lan_status} from "./action";

@connect(
    state=>({connected:state.home.connected,data:state.home.data,data_lan:state.home.data_lan,data_svpn:state.home.data_svpn}),
    dispatch=>bindActionCreators({get_wan_status,get_lan_status,get_svpn_status},dispatch)
)

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false
        }
    }
    render(){
        const {connected,data,data_lan,data_svpn} = this.props;
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
                            <p title={data.proto}>协议类型：{data.proto}</p>
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
                            <li className="ssid">SSID：{data_lan?data_lan.ssid_5g:''+'(5G),'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data_lan?data_lan.ssid_24g:''+'(2.4G)'}</li>
                            <li>内网IP：{data_lan?data_lan.ipaddr:''}</li>
                            <li>DHCP容量：{data_lan?data_lan.limit:''}</li>
                            <li className="ip">IP已分配：{data_lan?data_lan.lease_num:''}<span><img src={require('../../img/index/eye.png')}/><Link to="/infos/ip">查看详情</Link></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_wan_status,get_lan_status,get_svpn_status} = this.props;
        get_wan_status();
        get_lan_status();
        get_svpn_status();
    }
    showModal = () => {
        this.setState({
          visible: true,
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
}