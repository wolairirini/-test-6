import React,{Component} from "react";
import { Switch,Spin,message } from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {lanGet,lanSet} from "./action";
@connect(
    state=>({infos:state.net_inside.infos,loading:state.net_inside.loading}),
    dispatch=>bindActionCreators({lanGet,lanSet},dispatch)
)

export default class NetOutside extends Component{
    constructor(props){
        super(props);
        this.state={
            ipaddr:null,
            netmask:null,
            dhcp_enable:null,
            startip:null,
            limit:null,
            leasetime:null,
            check_ipaddr:null,
            check_netmask:null,
            check_startip:null,
            check_limit:null,
            check_leasetime:null,
        }
    }
    render(){
        const {infos,loading} = this.props;
        let {ipaddr,netmask,startip,limit,leasetime,dhcp_enable,check_ipaddr,check_leasetime,check_limit,check_netmask,check_startip} = this.state;
        if(!Object.keys(infos).length){
            return (
                <Spin className="net_outside" spinning={true} size='large' tip="Loading...">
                <div className="net_inside">
                    <h2 className="title">LAN口设置</h2>
                    <form>
                        <div className="input-group">
                            <label>IP地址：</label>
                            <input type="text" />
                            <span className='icon'>*</span>
                        </div>
                        <div className="input-group">
                            <label>子网掩码：</label>
                            <input type="text" />
                            <span className='icon'>*</span>
                        </div>
                        <div className="input-group dhcp">
                            <label>DHCP：</label>
                            <div>
                                <Switch className='switch' checked={false}/>
                                <p>关闭DHCP后，此网段的无线和有线终端都不能自动获取IP地址，在终端上手动指定IP地址才能连通路由器，请谨慎操作。</p>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>起始IP：</label>
                            <input type="text" />
                            <span className='icon'>*</span>
                        </div>
                        <div className="input-group">
                            <label>容量：</label>
                            <input type="number" />
                            <span className='icon'>*</span>
                        </div>
                        <div className="input-group">
                            <label>租期：</label>
                            <input type="number" />
                            <span className="tips">分钟</span>
                            <span className='icon'>*</span>
                        </div>
                        <div className="btns">
                            <button type="submit" className="btns-ok">确定</button>
                            <button type="reset" className="btns-reset">取消</button>
                        </div>
                    </form>
                </div>
                </Spin>
            )
        }
        return(
            <Spin spinning={loading} size='large' tip="Loading...">

            <div className="net_inside">
                <h2 className="title">LAN口设置</h2>
                <form onSubmit={(event)=>this.handleSubmit(event)}>
                    <div className="input-group">
                        <label>IP地址：</label>
                        <input required name='ipaddr' ref='ipaddr' onChange={(e)=>this.handleipaddrChange(e.target.value)} value={ipaddr!==null?ipaddr:infos.ipaddr} type="text" />
                        <span className='icon'>*</span>
                        <p style={{display:check_ipaddr?'block':'none'}} className='alert'>IP地址格式错误</p>
                    </div>
                    <div className="input-group">
                        <label>子网掩码：</label>
                        <input required name='netmask' ref='netmask' onChange={(e)=>this.handlenetmaskChange(e.target.value)} value={netmask!==null?netmask:infos.netmask} type="text" />
                        <span className='icon'>*</span>
                        <p style={{display:check_netmask?'block':'none'}} className='alert'>子网掩码格式错误</p>
                    </div>
                    <div className="input-group dhcp">
                        <label>DHCP：</label>
                        <div>
                            <Switch className='switch' checked={dhcp_enable!==null?dhcp_enable:infos.dhcp_enable} ref='dhcp_enable' onChange={(v)=>this.handledhcp_enableChange(v)} />
                            <p>关闭DHCP后，此网段的无线和有线终端都不能自动获取IP地址，在终端上手动指定IP地址才能连通路由器，请谨慎操作。</p>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>起始IP：</label>
                        <input required name='startip' ref='startip' onChange={(e)=>this.handlestartipChange(e.target.value)} value={startip!==null?startip:infos.startip} type="text" />
                        <span className='icon'>*</span>
                        <p style={{display:check_startip?'block':'none'}} className='alert'>IP地址格式错误</p>
                    </div>
                    <div className="input-group">
                        <label>容量：</label>
                        <input required min={1} name='limit' ref='limit' onChange={(e)=>this.handlelimitChange(e.target.value)} value={limit!==null?limit:infos.limit} type="number" />
                        <span className='icon'>*</span>
                        <p style={{display:check_limit?'block':'none'}} className='alert'>容量不能为0</p>
                    </div>
                    <div className="input-group">
                        <label>租期：</label>
                        <input required min={1} name='leasetime' ref='leasetime' onChange={(e)=>this.handleleasetimeChange(e.target.value)} value={leasetime!==null?leasetime:infos.leasetime} type="number" />
                        <span className="tips">分钟</span>
                        <span className='icon'>*</span>
                        <p style={{display:check_leasetime?'block':'none'}} className='alert'>租期不能为0</p>
                    </div>
                    <div className="btns">
                        <button disabled={loading} type="submit" className="btns-ok">确定</button>
                        <button disabled={loading} type="reset" className="btns-reset">取消</button>
                    </div>
                </form>
            </div>
            </Spin>
        )
    }
    componentDidMount(){
        const {lanGet} = this.props;
        lanGet();
    }
    handleSubmit(e){
        e.preventDefault?e.preventDefault():e.returnValue=false;

        const {lanSet,infos} = this.props;
        let {ipaddr,netmask,startip,limit,leasetime,dhcp_enable,check_ipaddr,check_leasetime,check_limit,check_netmask,check_startip} = this.state;
        ipaddr = ipaddr!==null?ipaddr:this.refs.ipaddr.value;
        netmask = netmask!==null?netmask:this.refs.netmask.value;
        startip = startip!==null?startip:this.refs.startip.value;
        limit = limit!==null?limit:this.refs.limit.value;
        leasetime = leasetime!==null?leasetime:this.refs.leasetime.value;
        dhcp_enable = dhcp_enable!==null?dhcp_enable:this.refs.dhcp_enable.value;

        // 校验
        check_ipaddr = !global.exp.ip.test(ipaddr);
        check_netmask = !global.exp.netmask.test(netmask);
        check_startip = !global.exp.ip.test(startip);
        check_limit = limit<1;
        check_leasetime = leasetime<1;
        if(check_ipaddr||check_netmask||check_startip||check_limit||check_leasetime){
            message.warn('请输入合法的内容');
            this.setState({
                check_ipaddr,check_leasetime,check_limit,check_netmask,check_startip
            })
            return;
        }
        if(!isEqualIPAddress(ipaddr,startip,netmask)){
            message.warn('ip地址不在同一个网段！');
            return;
        }
        

        let data = {
            ipaddr,netmask,startip,limit,leasetime,dhcp_enable
        }
        data = Object.assign({},infos,data);
        lanSet(data);
    }
    handleipaddrChange(value){
        let {check_ipaddr} = this.state;
        if(!global.exp.ip.test(value)&&value!==''){
            check_ipaddr = true;
        }else{
            check_ipaddr = false;
        }
        this.setState({
            ipaddr:value,
            check_ipaddr
        })
    }
    handlenetmaskChange(value){
        let {check_netmask} = this.state;
        if(!global.exp.netmask.test(value)&&value!==''){
            check_netmask = true;
        }else{
            check_netmask = false;
        }
        this.setState({
            netmask:value,
            check_netmask
        })
    }
    handlestartipChange(value){
        let {check_startip} = this.state;
        if(!global.exp.ip.test(value)&&value!==''){
            check_startip = true;
        }else{
            check_startip = false;
        }
        this.setState({
            startip:value,
            check_startip
        })
    }
    handlelimitChange(value){
        let {check_limit} = this.state;
        if((value<1)&&value!==''){
            check_limit = true;
        }else{
            check_limit = false;
        }
        this.setState({
            limit:value,
            check_limit
        })
    }
    handleleasetimeChange(value){
        let {check_leasetime} = this.state;
        if((value<1)&&value!==''){
            check_leasetime = true;
        }else{
            check_leasetime = false;
        }
        this.setState({
            leasetime:value,
            check_leasetime
        })
    }
    handledhcp_enableChange(value){
        this.setState({
            dhcp_enable:value
        })
    }
}


/**
 * [isEqualIPAddress 判断两个IP地址是否在同一个网段]
 * @param  {[String]}  addr1 [地址一]
 * @param  {[String]}  addr2 [地址二]
 * @param  {[String]}  mask  [子网掩码]
 * @return {Boolean}         [true or false]
 */
function isEqualIPAddress (addr1,addr2,mask){
    var res1 = [],
    res2 = [];
    addr1 = addr1.split(".");
    addr2 = addr2.split(".");
    mask  = mask.split(".");
    for(var i = 0,ilen = addr1.length; i < ilen ; i += 1){
        res1.push(parseInt(addr1[i]) & parseInt(mask[i]));
        res2.push(parseInt(addr2[i]) & parseInt(mask[i]));
    }
    if(res1.join(".") == res2.join(".")){
        console.log("在同一个网段");
        return true;
    }else{
        console.log("不在同一个网段");
        return false;
    }
}
