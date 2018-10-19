import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Spin} from "antd";
import {wirelessGet} from "./action";
import NetWifiHalf from "../net_wifi_half";
import NetWifiFive from "../net_wifi_five";

@connect(
    state=>({infos:state.net_wifi.infos,wirelessset:state.net_wifi.wirelessset}),
    dispatch=>bindActionCreators({wirelessGet},dispatch)
)

export default class NetWifi extends Component{
    constructor(props){
        super(props);
        this.state={
            proto_check:'half'
        }
    }
    render(){
        const {infos} = this.props;
        let {proto_check} = this.state;
        if(!Object.keys(infos).length){
            return (
                <Spin className="net_outside" spinning={true} size='large' tip="Loading...">
                <div className="net_wifi">
                    <h2 className="title">无线设置</h2>
                    <div className="input-group">
                        <label>设置：</label>
                        <div className="types">
                            <a href="javascript:void(0)"><input type="checkbox"/>无线2.4G</a>
                            <a href="javascript:void(0)"><input type="checkbox"/>无线5G</a>
                        </div>
                    </div>
                </div>
                </Spin>
            )
        }
        return(
            <div className="net_wifi">
                <h2 className="title">WIFI设置</h2>
                <div className="input-group">
                    <label>设置：</label>
                    <div className="types">
                        <a href="javascript:void(0)" onClick={()=>this.chooseType('half')} className={proto_check=='half'?'active':''} ><input readOnly checked={proto_check=='half'?true:false} type="checkbox"/>2.4G&nbsp;WIFI</a>
                        <a href="javascript:void(0)" onClick={()=>this.chooseType('five')} className={proto_check=='five'?'active':''} ><input readOnly checked={proto_check=='five'?true:false} type="checkbox"/>5G&nbsp;WIFI</a>
                    </div>
                </div>
                {
                    proto_check=='half'?<NetWifiHalf/>:<NetWifiFive/>
                }
            </div>
        )
    }
    componentDidMount(){
        const {wirelessGet} = this.props;
        wirelessGet();
    }
    componentWillReceiveProps(nextProp){
        if(nextProp.wirelessset){
            const {wirelessGet} = this.props;
            wirelessGet();
        }
    }
    chooseType(value){
        this.setState({
            proto_check:value
        })
    }
}