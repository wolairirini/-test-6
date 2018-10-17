import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal,Button,TimePicker,Switch,Select} from "antd";
import {showModal_Sleeper,handleCancel_Sleeper,timeGet,timeSet} from "./action";
import moment from 'moment';
const Option = Select.Option;

@connect(
    state=>({visible_sleeper:state.systemtools.visible_sleeper,loading_sleeper:state.systemtools.loading_sleeper,infos:state.systemtools.infos_sleeper,set_sleeper:state.systemtools.set_sleeper}),
    dispatch=>bindActionCreators({showModal_Sleeper,handleCancel_Sleeper,timeSet,timeGet},dispatch)
)

export default class SystemToolsChangePsw extends Component{
    constructor(props){
        super(props);
        this.state={
            enable:null,
            week:null,
            tm_hour:null,
            tm_min:null,
        }
    }
    render(){
        const {showModal_Sleeper,handleCancel_Sleeper,visible_sleeper,loading_sleeper,infos} = this.props;
        let {enable,week,tm_hour,tm_min,} = this.state;
        
        let tm = moment(infos.tm_hour+':'+infos.tm_min, 'HH:mm').format('HH:mm');
        
        return(
            <div className="col col-lg">
                <img style={{width:'1.066666666666666rem',height:'1.066666666666666rem'}} src={require('../../img/systemtools/icon_sleeper.png')}/>                
                {/* <h2>定时重启/升级：<span style={{color:'#66ccff'}}>{enable!==null?enable?tm:'未开启':infos.enable?tm:'未开启'}</span></h2> */}
                <h2>定时重启：<span style={{color:'#66ccff'}}>{infos.enable?tm:'未开启'}</span></h2>
                <a onClick={showModal_Sleeper} className="btn">修改时间</a>
                <Modal
                    maskClosable={false}
                    className="modal_sleeper"
                    visible={visible_sleeper}
                    title={<h2 style={{color:'#5FC7CE',fontSize:'14px'}}>修改定时重启时间</h2>}
                    onOk={()=>this.handleSubmit(this)}
                    onCancel={handleCancel_Sleeper}
                    footer={[
                        <Button key="submit" type="primary" loading={loading_sleeper} onClick={(event)=>this.handleSubmit(event,this)}>
                        确定
                        </Button>,
                        <Button disabled={loading_sleeper} key="back" onClick={handleCancel_Sleeper}>取消</Button>,
                    ]}
                >
                    <div className="input-group">
                        <label>是否启用定时重启：</label>
                        <Switch name='enable' ref='enable' onChange={(value)=>this.handleenableChange(value)} checked={enable!==null?enable:infos.enable} />
                    </div>
                    <div className="input-group">
                        <label>每天重启时间：</label>
                        <TimePicker name='tm' ref='tm' onChange={(value)=>this.handletmChange(value)} value={tm_hour!==null&&tm_min!==null?moment(tm_hour+':'+tm_min, 'HH:mm'):moment(infos.tm_hour+':'+infos.tm_min, 'HH:mm')} minuteStep={10} format={'HH:mm'} />
                    </div>
                    <div className="input-group">
                        <label>重启日期：</label>
                        <Select
                            mode="multiple"
                            style={{flex:'1'}}
                            allowClear
                            name='week' 
                            ref='week' 
                            onChange={(value)=>this.handleweekChange(value)} 
                            value={week!==null?week:infos.week}
                        >
                            <Option key={1}>周一</Option>
                            <Option key={2}>周二</Option>
                            <Option key={3}>周三</Option>
                            <Option key={4}>周四</Option>
                            <Option key={5}>周五</Option>
                            <Option key={6}>周六</Option>
                            <Option key={7}>周日</Option>
                        </Select>
                    </div>
                </Modal>
            </div>
        )
    }
    handleSubmit(e,_this){
        e.preventDefault?e.preventDefault():e.returnValue=false;

        const {timeSet,infos} = _this.props;
        let {enable,week,tm_hour,tm_min} = _this.state;
        enable = enable!==null?enable:infos.enable;
        week = week!==null?week:infos.week;
        tm_hour = tm_hour!==null?tm_hour:infos.tm_hour;
        tm_min = tm_min!==null?tm_min:infos.tm_min;
        let data = {
            enable,week,tm_hour,tm_min
        };
        // console.log(data);

        data = Object.assign({},infos,data);

        timeSet(data);
    }
    handleenableChange(value){
        // console.log(value)
        this.setState({
            enable:value
        })
    }
    handletmChange(value){
        if(!value){
            return;
        }
        value = value.format('HH:mm');
        // console.log(value);
        value = value.split(':');
        let tm_hour = value[0],
        tm_min = value[1];
        // console.log(tm_hour,tm_min)
        this.setState({
            tm_hour,
            tm_min
        })
    }
    handleweekChange(value){
        // console.log(value)
        this.setState({
            week:value
        })
    }

    componentDidMount(){
        const {timeGet} = this.props;
        timeGet();
    }
    componentWillReceiveProps(nextProps){
        const {timeGet} = this.props;
        if(nextProps.set_sleeper){
            timeGet();
        }
    }
}