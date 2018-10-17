import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal,Button} from "antd";
import {showModal_ChangePsw,handleCancel_changepsw,handleOk_changepsw} from "./action";
@connect(
    state=>({visible_changepsw:state.systemtools.visible_changepsw,loading_changepsw:state.systemtools.loading_changepsw,}),
    dispatch=>bindActionCreators({showModal_ChangePsw,handleCancel_changepsw,handleOk_changepsw},dispatch)
)

export default class SystemToolsChangePsw extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            newpwd_repeat:'',
            newpwd:'',
            curpwd:''
        }
    }
    render(){
        const {showModal_ChangePsw,handleCancel_changepsw,visible_changepsw,loading_changepsw} = this.props
        let {newpwd_repeat,newpwd,curpwd} = this.state;
        return(
            <div className="col">
            <img style={{width:'0.888888888888888rem',height:'1.022222222222221rem'}} src={require('../../img/systemtools/icon_psw.png')} />
            <h2>修改登录密码：</h2>
            <a className="btn" onClick={showModal_ChangePsw} >立即修改</a>
            <Modal
                maskClosable={false}
                className="modal_changepsw"
                visible={visible_changepsw}
                title={<h2 style={{color:'#5FC7CE',fontSize:'14px'}}>修改登录密码</h2>}
                onOk={()=>this.handleSubmit(this)}
                onCancel={handleCancel_changepsw}
                footer={[
                    <Button key="submit" type="primary" loading={loading_changepsw} onClick={()=>this.handleSubmit(this)}>
                    确定
                    </Button>,
                    <Button disabled={loading_changepsw} key="back" onClick={handleCancel_changepsw}>取消</Button>,
                ]}
            >
                <div className="input-group">
                    <label>原密码</label>
                    <input value={curpwd} onInput={(e)=>this.handlecurpwd(e.target.value)} name="curpwd" type="text" />
                </div>
                <div className="input-group">
                    <label>新密码</label>
                    <input value={newpwd} onInput={(e)=>this.handlenewpwd(e.target.value)} name="newpwd" type="text"/>
                </div>
                <div className="input-group">
                    <label>确认密码</label>
                    <input value={newpwd_repeat} onInput={(e)=>this.handlenewpwd_repeat(e.target.value)} name="newpwd_repeat" type="text"/>
                </div>
            </Modal>
            </div>
        )
    }
    handleSubmit(_this){
        const {handleOk_changepsw} = _this.props;
        let {data,newpwd,newpwd_repeat,curpwd} = _this.state;
        if(curpwd===''||newpwd===''){
            Modal.error({title:'输入不能为空！'});
            return;
        }
        if(newpwd!==newpwd_repeat){
            Modal.error({title:'密码不一致！'});
            return;
        }
        handleOk_changepsw(data);
    }
    handlecurpwd(value){
        this.setState({
            curpwd:value,
            data:Object.assign({},this.state.data,{curpwd:value})
        })
    }
    handlenewpwd(value){
        this.setState({
            newpwd:value,
            data:Object.assign({},this.state.data,{newpwd:value})
        })
    }
    handlenewpwd_repeat(value){
        this.setState({
            newpwd_repeat:value
        });
    }
    
}