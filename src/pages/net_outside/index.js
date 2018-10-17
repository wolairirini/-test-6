import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {wanGet} from "./action";
import {Spin} from "antd";
import NetOutsideAuto from "../net_outside_auto";
import NetOutsideBroadBand from "../net_outside_broadband";
import NetOutsideStatic from "../net_outside_static";

@connect(
    state=>({proto:state.net_outside.proto,infos:state.net_outside.infos}),
    dispatch=>bindActionCreators({wanGet},dispatch)
)

export default class NetOutside extends Component{
    constructor(props){
        super(props);
        this.state={
            proto_check:''
        }
    }
    render(){
        const {proto} = this.props;
        let {proto_check} = this.state;
        let protox;
        if(proto_check===''||proto_check===proto){
            protox = proto
        }else{
            protox = proto_check
        }
        if(!protox){
            return (
                <Spin className="net_outside" spinning={true} size='large' tip="Loading...">
                <div className="net_outside">
                    <h2 className="title">WAN口设置</h2>
                    <div className="input-group">
                        <label>上网方式：</label>
                        <div className="types">
                            <a href="javascript:void(0)"><input type="checkbox"/>自动获取(DHCP)</a>
                            <a href="javascript:void(0)"><input type="checkbox"/>宽带拨号(PPPOE)</a>
                            <a href="javascript:void(0)"><input type="checkbox"/>静态地址(STATIC)</a>
                        </div>
                    </div>
                </div>
                </Spin>
            )
        }

        return(
            <div className="net_outside">
                <h2 className="title">WAN口设置</h2>
                <div className="input-group">
                    <label>上网方式：</label>
                    <div className="types">
                        <a href="javascript:void(0)" onClick={()=>this.chooseType('dhcp')} className={protox=='dhcp'?'active':''} ><input readOnly checked={protox=='dhcp'?true:false} type="checkbox"/>自动获取(DHCP)</a>
                        <a href="javascript:void(0)" onClick={()=>this.chooseType('pppoe')} className={protox=='pppoe'?'active':''} ><input readOnly checked={protox=='pppoe'?true:false} type="checkbox"/>宽带拨号(PPPOE)</a>
                        <a href="javascript:void(0)" onClick={()=>this.chooseType('static')} className={protox=='static'?'active':''} ><input readOnly checked={protox=='static'?true:false} type="checkbox"/>静态地址(STATIC)</a>
                    </div>
                </div>
                {
                    protox=='dhcp'?<NetOutsideAuto/>:protox=='pppoe'?<NetOutsideBroadBand/>:<NetOutsideStatic/>
                }
            </div>
        )
    }
    componentDidMount(){
        const {wanGet} = this.props;
        wanGet();
    }
    chooseType(value){
        this.setState({
            proto_check:value
        })
    }
}