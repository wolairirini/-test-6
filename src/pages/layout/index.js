import React,{Component} from "react";
import {Link,Switch,Route} from "react-router-dom";
import Home from "../home";
import Find from "../find";
import {Layout as Layoutx,Row,Col} from 'antd';
const {Header,Content} = Layoutx;

export default class Layout extends Component{
    render(){
        return(
            <Layoutx>
                <Header>
                    <Row type={'flex'}>
                        <Col span={1}><Link to="/" >home</Link></Col>
                        <Col span={1} ><Link to="/find" >find</Link></Col>
                    </Row>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/find" component={Find} />
                        <Route path="*" component={Home} />
                    </Switch>
                </Content>
            </Layoutx>
        )
    }
}