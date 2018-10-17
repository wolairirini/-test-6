import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Table,Button} from "antd";
import {get_infos_ip} from "./action";
// import {EditableCell,EditableFormRow} from "../../components/EditableCell";

@connect(
    state=>({dataSource:state.infos_ip.dataSource}),
    dispatch=>bindActionCreators({get_infos_ip},dispatch)
)

export default class InfosIp extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSourcex:[]
        }
    }
    render(){
        const {dataSource} = this.props;
        let {dataSourcex} = this.state;
        const components = {
            body: {
            //   row: EditableFormRow,
            //   cell: EditableCell,
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
                    <Table components={components} rowSelection={this.rowSelection} rowKey={(r,i)=>(i)} scroll={{x:false,y:'19rem'}} dataSource={dataSourcex} columns={columns} title={null} bordered={true} pagination={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_infos_ip} = this.props;
        get_infos_ip();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.dataSource.length>0){
            console.log(this.state);
            this.setState({
                dataSourcex:nextProps.dataSource
            })
        }
    }
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSourcex: newData });
      }
    // 设置选择
    rowSelection = {
        columnTitle:'开放NAT',
        fixed:true,
        type:'radio',
        // onSelect:()=>alert(2)
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
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width:'7rem',
        render:(text,record)=>{
            return (
                <div>
                    {/* <Button>禁止访问</Button>
                    <Button>IP绑定</Button> */}
                    <Button onClick={()=>{
                        // console.log(record);
                        // return 
                        global.phone_name = record.name;
                        this.props.history.push({pathname:'/infos/detail/'+record['ip']})
                    }}>查看网络链接</Button>
                </div>
            )
        }
    }]

}