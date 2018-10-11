import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal} from "antd";
import {handleOk_restore} from "./action";
const confirm = Modal.confirm;
@connect(
    state=>({}),
    dispatch=>bindActionCreators({handleOk_restore},dispatch)
)

export default class SystemToolsRestore extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        const {} = this.props
        let {} = this.state;
        return(
            <div className="col">
                <img style={{width:'0.888888888888888rem',height:'0.9777777777777768rem'}} src={require('../../img/systemtools/icon_restore.png')}/>
                <h2>恢复出厂设置：</h2>
                <a className="btn" onClick={()=>this.showConfirm(this)} >立即恢复</a>
            </div>
        )
    }
    showConfirm(_this){
        const {handleOk_restore} = _this.props;
        confirm({
            className:'confirm',
            title: '确认恢复出厂设置？',
            okText:'确定',
            cancelText:'取消',
            maskClosable:false,
            onOk() {
            return handleOk_restore()
            },
            onCancel() {},
        });
    }
}