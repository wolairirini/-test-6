import React,{Component} from "react";
import {Button,Input,Layout,Row,Col} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {add,asyncadd} from "./action";
import {globaladd} from "../../globalactions";
const {Footer} = Layout;

@connect(
    state=>({num:state.home.num,name:state.name,sex:state.sex,isloading:state.home.isloading}),
    dispatch=>bindActionCreators({add,globaladd,asyncadd},dispatch)
)

export default class Home extends Component{
    render(){
        const {num,add,globaladd,name,sex,asyncadd,isloading} = this.props;
        return(
            <Layout className="home" >
                <Row type={'flex'} >
                    <Col push={3} span={1}>{num}</Col>
                    <Col span={1}>{name}</Col>
                    <Col span={1}>{sex}</Col>
                </Row>
                <Input ref="input" />
                <Footer>
                    <Button onClick={()=>add(this.refs.input.input.value)} >Add</Button>
                    <Button onClick={()=>globaladd(this.refs.input.input.value)} >GLOBAL_Add</Button>
                    <Button loading={isloading} onClick={()=>asyncadd(this.refs.input.input.value)} >Async_Add</Button>
                </Footer>
            </Layout>
        )
    }
}