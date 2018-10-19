import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Table,Button,Switch} from "antd";
import {get_infos_ip,set_infos_ip} from "./action";
import {EditableCell,EditableFormRow} from "../../components/EditableCell";
import {data_sort} from "../../components/functions";

@connect(
    state=>({dataSource:state.infos_ip.dataSource,loading:state.infos_ip.loading,ipset:state.infos_ip.ipset}),
    dispatch=>bindActionCreators({get_infos_ip,set_infos_ip},dispatch)
)

export default class InfosIp extends Component{
    render(){
        const {loading,dataSource} = this.props;
        // 筛选数据 
        let dataSourcex = dataSource;
        dataSourcex = data_sort(dataSourcex);

        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
                }),
            };
        });
        return(
            <div className="infos">
                <h2 className="title">终端详情</h2>
                <div className="article">
                    <Table loading={loading} components={components} rowClassName={this.setClassName} rowKey={(r,i)=>(i)} scroll={{x:false,y:'19rem'}} dataSource={dataSourcex} columns={columns} title={null} bordered={true} pagination={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_infos_ip} = this.props;
        get_infos_ip();
    }
    componentWillReceiveProps(nextProps){
        const {get_infos_ip} = this.props;
        if(nextProps.ipset){
            get_infos_ip();
        }
    }
    setClassName=(record)=>{
        return record.online?'':'offline'
    }
    handleSave = (row) => {
        const {set_infos_ip,dataSource} = this.props;
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            let data = row;
            set_infos_ip(data);
            return;
        }
        const newData = dataSource;
        const index = newData.findIndex(item => item.mac===row.mac);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        if(row.name===item.name){
            return;
        }
        let data = row;
        set_infos_ip(data);
    }

    handleSwitchChange = (value,record)=>{
        // console.log(value,record);
        const {set_infos_ip} = this.props;
        let data = {boost:value};
        data = Object.assign({},record,data)
        set_infos_ip(data);
    }
    handleNatChange = (value,record)=>{
        const {set_infos_ip} = this.props;
        let data = {dmz:value};
        data = Object.assign({},record,data)
        set_infos_ip(data);
    }
    // 设置列
    columns = [{
        title: '加速开关',
        dataIndex: 'switch',
        key: 'switch',
        width:'4rem',
        render:(text,record,index)=>{
            return (
                <Switch checked={record.boost} onChange={(value)=>this.handleSwitchChange(value,record)}/>
            )
        },
      },{
        title: '开放NAT',
        dataIndex: 'dmz',
        key: 'dmz',
        width:"4rem",
        render:(text,record)=>{
            return (
                <Switch disabled={!record.boost} checked={record.dmz} onChange={(value)=>this.handleNatChange(value,record)}/>
            )
        }
      },{
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
        width:'6rem',
      },{
        title: '全部链接',
        dataIndex: 'action',
        key: 'action',
        width:'6rem',
        render:(text,record,index)=>{
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
                        sessionStorage.setItem('infos_detail','ip');
                        this.props.history.push({pathname:'/infos/detail/'+record['ip']});
                    }}>查看链接</Button>
                </div>
            )
        }
    }]
}


