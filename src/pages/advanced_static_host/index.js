import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal,Table,Button,message} from "antd";
import {get_shost,cancel_shost,showModal_Add,handleCancel_Add,handleOk_Add} from "./action";

@connect(
    state=>({dataSource:state.static_host.dataSource,loadings:state.static_host.loadings,visible_Add:state.static_host.visible_Add,loading_Add:state.static_host.loading_Add,isCancel:state.static_host.isCancel,isAdd:state.static_host.isAdd}),
    dispatch=>bindActionCreators({cancel_shost,get_shost,showModal_Add,handleCancel_Add,handleOk_Add},dispatch)
)

export default class InfosIp extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            domain:'',
            ip:'',
            check_domain:null,
            check_ip:null,
        }
    }
    render(){
        const {dataSource,showModal_Add,handleCancel_Add,visible_Add,loading_Add} = this.props;
        let {domain,ip,check_domain,check_ip} = this.state;
        
        return(
            <div className="static_host">
                <h2 className="title">静态HOST</h2>
                <div className="article">
                    <Button onClick={showModal_Add} style={{marginBottom:'1rem'}}>添加条目</Button>
                    <Modal
                        maskClosable={false}
                        className="modal_shost_add"
                        visible={visible_Add}
                        title={<h2 style={{color:'#5FC7CE',fontSize:'14px'}}>添加条目</h2>}
                        onOk={()=>this.handleSubmit(this)}
                        onCancel={handleCancel_Add}
                        footer={[
                            <Button key="submit" type="primary" loading={loading_Add} onClick={()=>this.handleSubmit(this)}>
                            确定
                            </Button>,
                            <Button key="back" disabled={loading_Add} onClick={handleCancel_Add}>取消</Button>,
                        ]}
                    >
                        <div className="input-group">
                            <label>域名</label>
                            <input value={domain} onInput={(e)=>this.handledomain(e.target.value)} name="domain" type="text" />
                            <span className='icon'>*</span>
                            <p style={{display:check_domain?'block':'none'}} className='alert'>域名格式错误</p>
                        </div>
                        <div className="input-group">
                            <label>IP地址</label>
                            <input value={ip} onInput={(e)=>this.handleip(e.target.value)} name="ip" type="text"/>
                            <span className='icon'>*</span>
                            <p style={{display:check_ip?'block':'none'}} className='alert'>IP地址格式错误</p>
                        </div>
                    </Modal>

                    <Table rowKey={(r,i)=>(i)} dataSource={dataSource} scroll={{x:false,y:'18rem'}} columns={this.columns} title={null} bordered={true} pagination={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_shost} = this.props;
        get_shost();

    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        const {get_shost} = this.props;
        const {isCancel,isAdd} = nextProps;
        if(isCancel||isAdd){
            get_shost();
            // return true;
        }
    }
    // 增加条目
    handleSubmit(_this){
        const {handleOk_Add} = _this.props;
        let {data,domain,ip,check_domain,check_ip} = _this.state;

        // 校验
        check_ip = !global.exp.ip.test(ip);
        check_domain = !global.exp.domain.test(domain);
        if(check_ip||check_domain){
            message.warn('请输入合法的内容');
            this.setState({
                check_ip,check_domain
            })
            return;
        }
        handleOk_Add(data);
    }
    handledomain(value){
        let {check_domain} = this.state;
        if(!global.exp.domain.test(value)&&value!==''){
            check_domain = true;
        }else{
            check_domain = false;
        }
        this.setState({
            domain:value,
            check_domain,
            data:Object.assign({},this.state.data,{domain:value})
        })
    }
    handleip(value){
        let {check_ip} = this.state;
        if(!global.exp.ip.test(value)&&value!==''){
            check_ip = true;
        }else{
            check_ip = false;
        }
        this.setState({
            ip:value,
            check_ip,
            data:Object.assign({},this.state.data,{ip:value})
        })
    }
    // 删除条目 

    handleCancel(index,record){
        const {loadings,cancel_shost} = this.props;
        cancel_shost(index,record);
    }


    columns = [{
        title: '域名',
        dataIndex: 'domain',
        key: 'domain',
      }, {
        title: 'IP地址',
        dataIndex: 'ip',
        key: 'ip',
        width:'10rem'
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width:'10rem',
        render:(text,record,index)=>{
            index = 'cancel_'+index;
            let loadings = this.props.loadings;
            return (
                <div>
                    <Button loading={loadings[index]} onClick={()=>{
                        this.handleCancel(index,record);
                    }}>删除</Button>
                </div>
            )
        }
    }]

}