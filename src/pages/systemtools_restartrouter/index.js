import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal} from "antd";
import {handleOk_restartrouter} from "./action";
const confirm = Modal.confirm;
@connect(
    state=>({source:state.source}),
    dispatch=>bindActionCreators({handleOk_restartrouter},dispatch)
)

export default class SystemToolsRestartRouter extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let {} = this.state;
        return(
            <div className="col">
                <img style={{width:'0.9333333333333324rem',height:'0.9333333333333324rem'}} src={require('../../img/systemtools/icon_restart.png')}/>
                <h2>重启路由：</h2>
                <a className="btn" onClick={()=>this.showConfirm(this)} >立即重启</a>
            </div>
        )
    }
    showConfirm(_this){
        const {handleOk_restartrouter} = _this.props;
        confirm({
            className:'confirm',
            title: '确认重启？',
            okText:'确定',
            cancelText:'取消',
            maskClosable:false,
            onOk() {
                return handleOk_restartrouter()
            },
            onCancel() {
            },
        });
    }
}