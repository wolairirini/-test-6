import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Table,Button} from "antd";
import {get_infos_ip} from "./action";

@connect(
    state=>({dataSource:state.infos_ip.dataSource}),
    dispatch=>bindActionCreators({get_infos_ip},dispatch)
)

export default class InfosIp extends Component{
    render(){
        const {dataSource} = this.props;
        
        return(
            <div className="infos">
                <h2 className="title">终端详情</h2>
                <div className="article">
                    <Table rowKey={(r,i)=>(i)} scroll={{x:false,y:'19rem'}} dataSource={dataSource} columns={this.columns} title={null} bordered={true} pagination={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_infos_ip} = this.props;
        get_infos_ip();
    }



    columns = [{
        title: '设备名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '设备MAC',
        dataIndex: 'mac',
        key: 'mac',
        width:'6rem',
      },{
        title: 'IP地址',
        dataIndex: 'ip',
        key: 'ip',
        width:'6.2rem',
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width:'14rem',
        render:(text,record)=>{
            return (
                <div>
                    <Button>禁止访问</Button>
                    <Button>IP绑定</Button>
                    <Button onClick={()=>{
                        // console.log(record);
                        // return 
                        this.props.history.push({pathname:'/infos/detail/'+record['ip']})
                    }}>加速详情</Button>
                </div>
            )
        }
    }]

}