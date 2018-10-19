import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Table,Button} from "antd";
import {get_infos_js} from "./action";
import {data_sort} from "../../components/functions";

@connect(
    state=>({dataSource:state.infos_js.dataSource,loading:state.infos_js.loading,jsset:state.infos_js.jsset}),
    dispatch=>bindActionCreators({get_infos_js},dispatch)
)

export default class InfosJs extends Component{
    render(){
        const {loading,dataSource} = this.props;
        let dataSourcex = dataSource;
        dataSourcex = data_sort(dataSourcex);
        // console.log(dataSource)
        return(
            <div className="infos">
                <h2 className="title">已加速终端</h2>
                <div className="article">
                    <Table loading={loading} rowClassName={this.setClassName} rowKey={(r,i)=>(i)} scroll={{x:false,y:'19rem'}} dataSource={dataSourcex} columns={this.columns} title={null} bordered={true} pagination={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_infos_js} = this.props;
        get_infos_js();
    }
 
    setClassName=(record)=>{
        // console.log(record)
        let cname = '';
        cname += record.boost?'':'unjs ';
        cname += record.online?'':'offline ';
        return cname;
    }
    // 设置列
    columns = [{
        title: '设备名',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      }, {
        title: '设备MAC',
        dataIndex: 'mac',
        key: 'mac',
        width:'7rem',
      },{
        title: 'IP地址',
        dataIndex: 'ip',
        key: 'ip',
        width:'6.5rem',
      },{
        title: '加速通道链接',
        dataIndex: 'action',
        key: 'action',
        width:'7rem',
        render:(text,record)=>{
            // console.log(record)
            if(!record.online){
                return(<div>——</div>)
            }
            return (
                <div>
                    {/* <Button>禁止访问</Button>
                    <Button>IP绑定</Button> */}
                    <Button onClick={()=>{
                        // console.log(record);
                        // return 
                        sessionStorage.setItem('phone_name',record.name);
                        sessionStorage.setItem('infos_detail','js');
                        this.props.history.push({pathname:'/infos/detail/'+record['ip']});
                    }}>查看链接</Button>
                </div>
            )
        }
    }]

}