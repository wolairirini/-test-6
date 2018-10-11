import React,{Component} from "react";
import {Link} from "react-router-dom";
import { Menu, Dropdown, Icon } from 'antd';

const networksettings = (
    <Menu style={{top:"1.12rem",display:'flex'}}>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="0">
        <Link to="/net/outside">外网设置</Link>
      </Menu.Item>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="1">
        <Link to="/net/inside">内网设置</Link>
      </Menu.Item>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="2">
        <Link to="/net/wifi">无线设置</Link>
      </Menu.Item>
    </Menu>
);

const advancedsettings = (
    <Menu style={{top:"1.12rem",display:'flex'}}>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="0">
        <Link to="/advanced/upnp">开启UPnP</Link>
      </Menu.Item>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="1">
        <Link to="/advanced/dmz">DMZ主机</Link>
      </Menu.Item>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="2">
        <Link to="/advanced/static_host">静态HOST </Link>
      </Menu.Item>
    </Menu>
);

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            active:''
        }
    }
    render(){
        const {active} = this.state;
        return(
            <div className="header">
                <h1 className="logo">
                    <img src={require('../../img/index/logo.png')}/>
                </h1>
                <ul className="nav">
                    <li className="nav-item"><Link to="/" >首页</Link></li>
                    <li className="nav-item">
                    <Dropdown overlay={networksettings} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                        网络设置<Icon type="down" />
                        </a>
                    </Dropdown>
                    </li>
                    <li className="nav-item">
                    <Dropdown overlay={advancedsettings} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                        高级设置<Icon type="down" />
                        </a>
                    </Dropdown>
                    </li>
                    <li className="nav-item"><Link to="/systemtools" >系统工具</Link></li>
                </ul>
                <ul className="share">
                    <li onMouseLeave={()=>{this.setState({active:''})}} onMouseEnter={()=>{this.setState({active:'weibo'})}} className="share-weibo">
                        <img src={active=='weibo'?require('../../img/index/weibo_active.png'):require('../../img/index/weibo.png')}/>
                        <div></div>
                    </li>
                    <li onMouseLeave={()=>{this.setState({active:''})}} onMouseEnter={()=>{this.setState({active:'weixin'})}} className="share-weixin">
                        <img src={active=='weixin'?require('../../img/index/weixin_active.png'):require('../../img/index/weixin.png')}/>
                        <div></div>
                    </li>
                </ul>
            </div>
        )
    }
}