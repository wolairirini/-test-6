import React,{Component} from "react";
import {Switch,Route,Redirect} from "react-router-dom";
import Header from "../header";
import SideIndex from "../side_index";
import SideOthers from "../side_others";
import Home from "../home";
import NetOutside from "../net_outside";
import NetInside from "../net_inside";
import NetWifi from "../net_wifi";
import Upnp from "../advanced_upnp";
import Dmz from "../advanced_dmz";
import StaticHost from "../advanced_static_host";
import SystemTools from "../systemtools";
import InfosIp from "../infos_ip";
import InfosDetail from "../infos_detail";

export default class Layout extends Component{
    render(){
        return(
            <div className="container">
                <Header/>
                <div className="main" style={window.location.pathname=='/'?{'height':'28rem'}:{}} >
                    <div className="main-side">
                        <Switch>
                            <Route exact path="/" component={SideIndex} />
                            <Route path="*" component={SideOthers} />
                        </Switch>
                    </div>
                    <div className="main-content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/net/outside" component={NetOutside} />
                            <Route path="/net/inside" component={NetInside} />
                            <Route path="/net/wifi" component={NetWifi} />
                            <Route path="/advanced/upnp" component={Upnp} />
                            <Route path="/advanced/dmz" component={Dmz} />
                            <Route path="/advanced/static_host" component={StaticHost}/>
                            <Route path="/systemtools" component={SystemTools} />
                            <Route path="/infos/ip" component={InfosIp} />
                            <Route path="/infos/detail/:ip" component={InfosDetail} />
                            <Redirect to='/'/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}