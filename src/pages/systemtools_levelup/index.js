import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal,Button,Upload, Icon, message,Progress} from "antd";
import {showModal_Levelup,handleCancel_Levelup,handleOk_Levelup} from "./action";
import axios from 'axios'; 

// console.log(axios.defaults['baseURL']);

const Dragger = Upload.Dragger;
  

@connect(
    state=>({visible_levelup:state.systemtools.visible_levelup,loading_levelup:state.systemtools.loading_levelup,loading_levelup_close:state.systemtools.loading_levelup_close,levelup:state.systemtools.levelup}),
    dispatch=>bindActionCreators({showModal_Levelup,handleCancel_Levelup,handleOk_Levelup},dispatch)
)

export default class SystemToolsChangePsw extends Component{
    constructor(props){
        super(props);
        this.state={
            fileList:[],
            process_status:'normal',
            process_percent:0,
            process_visable:false,
            cancel_disable:false
        }
    }
    render(){
        const {showModal_Levelup,handleCancel_Levelup,visible_levelup,loading_levelup,loading_levelup_close} = this.props;
        let {cancel_disable,fileList,process_status,process_percent,process_visable} = this.state;
        let isUpload =fileList[0]?fileList[0].status==='success'?false:true:true;
        return(
            
            <div className="col">
                <img style={{width:'0.7999999999999992rem',height:'1.066666666666666rem'}} src={require('../../img/systemtools/icon_lvup.png')}/>
                <h2>固件升级：</h2>
                <a onClick={showModal_Levelup} className="btn">立即升级</a>
                <Modal
                    maskClosable={false}
                    className="modal_levelup"
                    visible={visible_levelup}
                    title={<h2 style={{color:'#5FC7CE',fontSize:'14px'}}>固件升级</h2>}
                    onOk={()=>this.handleSubmit(this)}
                    onCancel={()=>{this.setState({fileList:[]});handleCancel_Levelup(isUpload)}}
                    footer={[
                        <Button disabled={isUpload} key="submit" type="primary" loading={loading_levelup} onClick={()=>this.handleSubmit(this)}>
                        确定
                        </Button>,
                        <Button disabled={cancel_disable} loading={loading_levelup_close} key="back" onClick={()=>{this.setState({fileList:[]});handleCancel_Levelup(isUpload)}}>取消</Button>,
                    ]}
                >
                    <Dragger {...this.Draggerprops} onChange={(info)=>this.handleChange(info,this)} fileList={fileList}>
                        <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或拖动文件到该区域上传</p>
                        <p className="ant-upload-hint">支持单个或批量上传。严格禁止上传公司数据或其他频带文件</p>
                    </Dragger>
                </Modal>
                <Modal
                    className="modal_process"
                    title={<h2 style={{color:'#5FC7CE',fontSize:'14px',textAlign:'center'}}>固件升级中，请勿关闭或重启路由器……</h2>}
                    visible={process_visable}
                    footer={null}
                    closable={false}
                    maskClosable ={false}
                >
                    <Progress status={process_status} percent={process_percent}/>
                </Modal>
            </div>
        )
    }
    handleSubmit(_this){
        const {handleOk_Levelup} = this.props;
        handleOk_Levelup();
    }
    handleChange(info,_this) {
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        // 2. Filter successfully uploaded files according to response from server
        this.setState({
            cancel_disable:true
        })
        if(fileList[0].status==='done'){
            this.setState({
                cancel_disable:false
            })
            if (fileList[0].response.meta.code===0) {
                message.success('固件上传成功');
                fileList[0].status = 'success';
            }else{
                message.error(fileList[0].response.meta.msg);
                fileList[0].status = 'error';
            }
        }
        _this.setState({ fileList });
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps.levelup){
            let {process_percent} = this.state;
            this.setState({
                process_visable:true,
                process_status:'active'
            });
            let time = 0;
            let timer = setInterval(()=>{
                time++;
                if(time>=120){
                    clearInterval(timer);
                    this.setState({
                        process_percent:100,
                        process_status:'active'
                    });
                    message.warn('连接超时，请重新登录！');
                    sessionStorage.removeItem('userinfo');
                    setTimeout(() => {
                        window.location.href='/#/login';
                    }, 200);
                    return;
                }else if(time>=50){
                    axios({
                        url:'/api/usr/nginx_ready'
                    }).then(data=>{
                        clearInterval(timer);
                        this.setState({
                            process_percent:100,
                            process_status:'success'
                        });
                        message.success('更新成功，请重新登录！');
                        sessionStorage.removeItem('userinfo');
                        setTimeout(() => {
                            window.location.href='/#/login';
                        }, 200);
                        return;
                    }).catch(err=>{
                        console.log(err);
                    });
                }
                process_percent=Number((time/120*100).toFixed(1));
                this.setState({
                    process_percent
                });
            },1000)
        }
    }
    Draggerprops = {
        name: 'file',
        multiple: false,
        headers: 
        {
            'X-Requested-With': null,
            'Authorization':sessionStorage.getItem('userinfo')?JSON.parse(sessionStorage.getItem('userinfo')).token:null
        },
        action: axios.defaults.baseURL+'/api/upload/put',
    }
    
}