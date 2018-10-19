import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Spin} from "antd";
// import {get_infos_ip} from "./action";

@connect(
    state=>({loading:state.infos_wan.loading}),
    dispatch=>bindActionCreators({},dispatch)
)

export default class InfosIp extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        const {infos,loading} = this.props;
        return(
            <Spin spinning={loading} size='large' tip="Loading...">
            <div className="infos_wan">
                <h2 className="title">WAN口详情</h2>
                <div className="article">
                    <ul>
                        <li><label>连接状态：</label><span className="success">已连接{}</span></li>
                        <li><label>连接方式：</label><span>宽带拨号{}</span></li>
                        <li><label>WAN IP：</label><span>182.138.119.222{}</span></li>
                        <li><label>子网掩码：</label><span>255.255.255.0{}</span></li>
                        <li><label>网关：</label><span>182.138.119.222{}</span></li>
                        <li><label>主DNS：</label><span>182.138.119.222{}</span></li>
                        <li><label>备DNS：</label><span>182.138.119.222{}</span></li>
                        <li><label>连接时间：</label><span>1:20:1{}</span></li>
                        <li><label>状态诊断：</label><span className="success">网络连接成功{}</span></li>
                    </ul>
                    <div className="btns">
                        <button disabled={loading} className="btns-ok">断开{}</button>
                    </div>
                </div>
            </div>
            </Spin>
        )
    }
}