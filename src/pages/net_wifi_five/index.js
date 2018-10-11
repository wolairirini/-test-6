import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Radio,Select,Spin,message } from 'antd';
import {wirelessSet} from "../net_wifi/action";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@connect(
    state=>({infos:state.net_wifi.infos,loading:state.net_wifi.loading}),
    dispatch=>bindActionCreators({wirelessSet},dispatch)
)

export default class NetWifiFive extends Component{
    constructor(props){
        super(props);
        this.state={
            ssid:null,
            key:null,
            htmode:null,
            channel:null,
            check_ssid:null,
            check_key:null,
        }
    }
    render(){
        const {infos,loading} = this.props;
        let {ssid,key,htmode,channel,check_key,check_ssid} = this.state;
        let infosx;
        if(Object.keys(infos).length > 0){
            infosx = infos.wl5g;
        }else{
            infosx = {};            
        }

        return(
            <Spin style={{top:'0%'}} spinning={loading} size='large' tip="Loading...">
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="input-group">
                    <label>5G SSID：</label>
                    <input name='ssid' ref='ssid' onChange={(e)=>this.handleSsidChange(e.target.value)} value={ssid!==null?ssid:infosx.ssid} type="text" />
                    <span className='icon'>*</span>
                    <p style={{display:check_ssid?'block':'none'}} className='alert'>SSID限制在32个字符以内</p>
                </div>
                <div className="input-group">
                    <label>密码：</label>
                    <input name='key' ref='key' onChange={(e)=>this.handleKeyChange(e.target.value)} value={key!==null?key:infosx.key} type="text" />
                    <p style={{display:check_key?'block':'none'}} className='alert'>密码限制在32个字符以内</p>
                </div>
                <div className="input-group">
                    <label>频段带宽：</label>
                    <div>
                    <RadioGroup name='htmode' ref='htmode' onChange={(e)=>this.handleHtmodeChange(e.target.value)} value={htmode!==null?htmode:infosx.htmode}>
                        <RadioButton value="0">自动</RadioButton>
                        <RadioButton value="1">20Mhz</RadioButton>
                        <RadioButton value="2">40Mhz</RadioButton>
                        <RadioButton value="3">80Mhz</RadioButton>
                    </RadioGroup>
                    </div>
                </div>
                <div className="input-group">
                    <label>信道：</label>
                    <div>
                    <Select name='channel' ref='channel' onChange={(value)=>this.handleChannelChange(value)} value={channel!==null?channel:infosx.channel}>
                        <Option value="0">自动</Option>
                        <Option value="36">信道36</Option>
                        <Option value="40">信道40</Option>
                        <Option value="44">信道44</Option>
                        <Option value="48">信道48</Option>
                        <Option value="149">信道149</Option>
                        <Option value="153">信道153</Option>
                        <Option value="157">信道157</Option>
                        <Option value="161">信道161</Option>
                        <Option value="165">信道165</Option>
                    </Select>
                    </div>
                </div>
                <div className="btns">
                    <button disabled={loading} type="submit" className="btns-ok">确定</button>
                    <button disabled={loading} type="reset" className="btns-reset">取消</button>
                </div>
            </form>
            </Spin>
        )
    }
    handleSubmit(e){
        e.preventDefault?e.preventDefault():e.returnValue=false;
        
        const {wirelessSet,infos} = this.props;
        let {ssid,key,htmode,channel,check_key,check_ssid} = this.state;
        ssid = ssid!==null?ssid:this.refs.ssid.value;
        key = key!==null?key:this.refs.key.value;
        htmode = htmode!==null?htmode:this.refs.htmode.value;
        channel = channel!==null?channel:this.refs.channel.value;
        // 校验
        check_ssid = ssid.length>32;
        check_key = key.length>32;
        if(check_ssid||check_key){
            message.warn('请输入合法的内容');
            this.setState({
                check_key,check_ssid
            })
            return;
        }

        let data = {
            ssid,
            key,
            htmode,
            channel
        }
        data = Object.assign({},infos,{wl5g:data});
        wirelessSet(data);
    }
    handleSsidChange(value){
        let {check_ssid} = this.state;
        if((value.length>32)&&value!==''){
            check_ssid = true;
        }else{
            check_ssid = false;
        }
        this.setState({
            ssid:value,
            check_ssid
        })
    }
    handleKeyChange(value){
        let {check_key} = this.state;
        if((value.length>32)&&value!==''){
            check_key = true;
        }else{
            check_key = false;
        }
        this.setState({
            key:value,
            check_key
        })
    }
    handleHtmodeChange(value){
        this.setState({
            htmode:value
        })
    }
    handleChannelChange(value){
        this.setState({
            channel:value
        })
    }
}