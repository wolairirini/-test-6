import React,{Component} from "react";
import {Link} from "react-router-dom";
import { Menu, Dropdown, Icon,Popover } from 'antd';
import img_wx from '../../img/index/erweima.png';

const networksettings = (
    <Menu style={{top:"1.12rem",display:'flex'}}>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="0">
        <Link to="/net/outside">WAN口设置</Link>
      </Menu.Item>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="1">
        <Link to="/net/inside">LAN口设置</Link>
      </Menu.Item>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="2">
        <Link to="/net/wifi">WIFI设置</Link>
      </Menu.Item>
    </Menu>
);

const advancedsettings = (
    <Menu style={{top:"1.12rem",display:'flex'}}>
      <Menu.Item style={{height:'3rem',display:'flex',alignItems:'center',padding:'0 1rem'}} key="0">
        <Link to="/advanced/upnp">UPnP设置</Link>
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
                    <li className="share-weibo">
                        <Popover placement="bottom" title={null} content={(<img src={img_wx} />)} trigger="click">
                            <a href="javascript:;"></a>
                        </Popover>
                    </li>
                    <li className="share-weixin">
                        <Popover placement="bottom" title={null} content={(<img src={img_wx} />)} trigger="click">
                            <a href="javascript:;"></a>
                        </Popover>
                    </li>
                </ul>
            </div>
        )
    }
}