import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Switch,Table} from "antd";
import {upnpGet,upnpGetLeases,upnpSet} from "./action";

const columns = [{
    title: '应用名称',
    dataIndex: 'app',
    key: 'app',
  }, {
    title: '客户端IP',
    dataIndex: 'host',
    key: 'host',
    width:'7rem',

  },{
    title: '内部端口',
    dataIndex: 'lport',
    key: 'lport',
    width:'4rem',

  },{
    title: '外部端口',
    dataIndex: 'pport',
    key: 'pport',
    width:'4rem',

  },{
    title: '协议',
    dataIndex: 'proto',
    key: 'proto',
    width:'4rem',

  }, ];


@connect(
    state=>({dataSource:state.upnp.dataSource,enable:state.upnp.enable}),
    dispatch=>bindActionCreators({upnpGetLeases,upnpGet,upnpSet},dispatch)
)

export default class Upnp extends Component{
    constructor(props){
        super(props);
        this.state={
            pageSize:12
        }
    }
    render(){
        const {dataSource,enable,upnpSet} = this.props;
        let {pageSize} = this.state;
        return(
            <div className="upnp">
                <h2 className="title">开启UPnP<Switch className="switch" checked={enable} onChange={(v)=>upnpSet(v)}/></h2>
                <div className="article">
                    <p>开启∪PnP ( Universal Plug and Play ,通用即插即用)功能后,局域网中的计算机可以请求路由器自动进行端口转换。这样，互联网.上的计算机就能在需要时访问局域网计算机上的资源(如MSN Messenger或迅雷BT、 PPTV 等支持∪PnP协议的应用程序),让您在观看在线视频或使用多 点下载等方面的软件时,享受更加稳定的网络。</p>
                    <Table rowKey={(r,i)=>(i)} dataSource={dataSource} scroll={{x:false,y:pageSize+'rem'}} columns={columns} title={()=>(<h2 className="table_title">UPnP端口映射</h2>)} bordered={true} pagination={false}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {upnpGet,upnpGetLeases} = this.props;
        upnpGet();
        upnpGetLeases();
    // 调整数据条数
        this.resize();
        window.addEventListener("resize", ()=>{this.resize()});
    }

    componentWillUnmount(){
        window.removeEventListener("resize", ()=>{this.resize()});
    }
    resize(){
        let {pageSize} = this.state;
        if(window.innerWidth<1280){
            pageSize = 9;
        }else if(window.innerWidth<1366){
            pageSize = 10;

        }else{
            pageSize = 12;
        }
        this.setState({pageSize});
    }
}