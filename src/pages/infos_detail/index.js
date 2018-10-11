import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Table} from "antd";
import {get_infos_detail} from "./action";

@connect(
    state=>({dataSource:state.infos_detail.dataSource}),
    dispatch=>bindActionCreators({get_infos_detail},dispatch)
)

export default class InfosDetail extends Component{
    render(){
        const {dataSource} = this.props;
        // console.log(dataSource[0]);
        // console.log(this.columns)
        return(
            <div className="infos infos_detail">
                <h2 className="title">加速详情&nbsp;—&nbsp;{this.props.match.params.ip}</h2>
                <div className="article">
                    <a onClick={this.downloadExcel} href='javascript:;' className='download-table-xls-button'>导出报表</a>
                    <Table ref='table' rowKey={(r,i)=>(i)} scroll={{x:false,y:'17rem'}} dataSource={dataSource} pagination={false} columns={this.columns} title={null} bordered={true} style={{marginTop:'1rem'}} />
                </div>
            </div>
        )
    }
    componentDidMount(){
        const {get_infos_detail} = this.props;
        const ip = this.props.match.params.ip;
        get_infos_detail(ip);
        this.timer = setInterval(()=>{
            get_infos_detail(ip);
        },3000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    downloadExcel = () =>{
        const { dataSource } = this.props;
        // var option={};
        // let dataTable = [];
        // if (dataSource.length>0) {
        //     dataSource.map((item,i)=>{
        //         let obj = {
        //             '本地IP':item.sip,
        //             '本地端口':item.sport,
        //             '远端IP':item.dip,
        //             '远端端口':item.dport,
        //             '协议':item.proto,
        //             '状态':item.ste,
        //             '上行速率':item.upload,
        //             '下行速率':item.download,
        //         };
        //         dataTable.push(obj);
        //     })
        // };
        // option.fileName = '加速详情'+this.props.match.params.ip
        // option.datas=[{
        //     sheetData:dataTable,
        //     sheetName:'sheet',
        //     sheetFilter:['本地IP','本地端口','远端IP','远端端口','协议','状态','上行速率','下行速率'],
        //     sheetHeader:['本地IP','本地端口','远端IP','远端端口','协议','状态','上行速率','下行速率'],
        // }];
        
        // var toExcel = new ExportJsonExcel(option); //new
        // toExcel.saveExcel();

        // 导出txt
        let dataTable = `本地IP|本地端口|远端IP|远端端口|协议|状态|上行速率|下行速率|上行流量|下行流量\r\n`;
        if (dataSource.length>0) {
            dataSource.map((item,i)=>{
                let obj = `${item.sip}|${item.sport}|${item.dip}|${item.dport}|${item.proto}|${item.ste}|${item.rupload}|${item.rdownload}|${item.upload}|${item.download}\r\n`;

                dataTable+=obj;
            });

        };
        exportRaw('加速详情_'+this.props.match.params.ip+'.txt', dataTable)

    }

    columns = [{
        title: '本地端口',
        dataIndex: 'sport',
        key: 'sport',
      },{
        title: '远端IP',
        dataIndex: 'dip',
        key: 'dip',
        width:'6rem'
      },{
        title: '远端端口',
        dataIndex: 'dport',
        key: 'dport',
        width:'4rem'
      },{
        title: '协议',
        dataIndex: 'proto',
        key: 'proto',
        width:'3.5rem'
      },{
        title: '上行速率',
        dataIndex: 'rupload',
        key: 'rupload',
        width:'4rem',
        render:(text, record)=>{
            return Unitconversion(text);
        }
      },{
        title: '下行速率',
        dataIndex: 'rdownload',
        key: 'rdownload',
        width:'4rem',
        render:(text, record)=>{
            return Unitconversion(text);
        }
      },{
        title: '上行流量',
        dataIndex: 'upload',
        key: 'upload',
        width:'5rem',
        sorter: (a, b) => a.upload - b.upload,
        render:(text, record)=>{
            return Unitconversion(text);
        }

      },{
        title: '下行流量',
        dataIndex: 'download',
        key: 'download',
        width:'5rem',
        sorter: (a, b) => a.download - b.download,
        render:(text, record)=>{
            return Unitconversion(text);
        }
      }]

}


function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
  }
  
function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}


function Unitconversion(limit){
    limit = parseInt(limit);
    var size = "";
    if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                            //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }
    var sizeStr = size + "";                        //转成字符串
    var index = sizeStr.indexOf(".");                    //获取小数点处的索引
    var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
    if(dou == "00"){                                //判断后两位是否为00，如果是则删除00                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    // console.log(size);

    return size;
}
