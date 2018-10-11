import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {} from "./action";
import SystemToolsChangePsw from "../systemtools_changepsw";
import SystemToolsRestore from "../systemtools_restore";
import SystemToolsRestartRouter from "../systemtools_restartrouter";
import SystemToolsSleeper from "../systemtools_sleeper";
import SystemToolsLevelup from "../systemtools_levelup";
@connect(
    state=>({}),
    dispatch=>bindActionCreators({},dispatch)
)

export default class SystemTools extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div className="systemtools">
                <h2 className="title">系统工具</h2>
                <div className="systemtools-content">
                    <div className="row">
                        <SystemToolsChangePsw/>
                        <SystemToolsRestore/>
                        <SystemToolsRestartRouter/>
                    </div>
                    <div className="row">
                        <SystemToolsLevelup/>
                        <SystemToolsSleeper/>
                    </div>
                </div>
            </div>
        )
    }
}