import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {dmzGet,dmzSet} from './action';
import {Spin,message} from "antd";

@connect(
    state=>({enable:state.dmz.enable,host:state.dmz.host,loading:state.dmz.loading}),
    dispatch=>bindActionCreators({dmzGet,dmzSet},dispatch)
)

export default class Dmz extends Component{
    constructor(props){
        super(props);
        this.state={
            hostx:null,
            enablex:null,
            check_hostx:null
        }
    }
    render(){
        const {host,enable,loading} = this.props;
        let {hostx,enablex,check_hostx} = this.state;
        return(
            <div className="dmz">
                <h2 className="title">DMZ主机</h2>
                <Spin spinning={loading} size='large' tip="Loading...">

                <form onSubmit={(event)=>this.handleSubmit(event)}>
                    <div className="input-group">
                        <label>启用：</label>
                        <div>
                            <input name='enable' ref='enable' onChange={(e)=>this.handleenableChange(e.target.checked)} checked={enablex!==null?enablex:enable} type="checkbox"/>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>IP地址：</label>
                        <input disabled={enablex!==null?!enablex:!enable} name='host' ref='host' onChange={(e)=>this.handlehostChange(e.target.value)} value={hostx!==null?hostx:host} type="text" />
                        <span className='icon'>*</span>
                        <p style={{display:check_hostx?'block':'none'}} className='alert'>IP地址格式错误</p>
                    </div>
                    <div className="btns">
                        <button disabled={loading} type="submit" className="btns-ok">确定</button>
                        <button disabled={loading} type="reset" className="btns-reset">取消</button>
                    </div>
                </form>
                </Spin>
            </div>
        )
    }
    componentDidMount(){
        const {dmzGet} = this.props;
        dmzGet();
    }

    handleSubmit(e){
        e.preventDefault?e.preventDefault():e.returnValue=false;
        const {dmzSet} = this.props;
        let {hostx,enablex,check_hostx} = this.state;
        hostx = hostx!==null?hostx:this.refs.host.value;
        enablex = enablex!==null?enablex:this.refs.enable.checked;
        // 校验
        if(!enablex){
            hostx = '';
        }else{
            check_hostx = !global.exp.ip.test(hostx);
            if(check_hostx){
                message.warn('请输入合法的内容');
                this.setState({
                    check_hostx
                })
                return;
            }
        }

        

        let data = {
            host:hostx,
            enable:enablex
        }
        dmzSet(data);
    }
    handlehostChange(value){
        let {check_hostx} = this.state;
        if(!global.exp.ip.test(value)&&value!==''){
            check_hostx = true;
        }else{
            check_hostx = false;
        }
        this.setState({
            hostx:value,
            check_hostx
        })
    }
    handleenableChange(value){
        this.setState({
            enablex:value
        })
    }
}