import React,{Component} from "react";

export default class SideOthers extends Component{
    render(){
        return(
            <div className="side_others">
                <div className="top">
                    <img className="icon" src={require('../../img/systemtools/kefu.png')} />
                    <h2 className="title">极迅路由客服中心</h2>
                    <p className="describe">QQ客服：800018682</p>
                    <p className="describe">电话客服：400-655-7787</p>
                </div>
                <div className="bottom">
                    <img className="icon" src={require('../../img/systemtools/time.png')}/>
                    <h2 className="title">工作时间：</h2>
                    <p className="describe">周一~周日（9:30~22:00）</p>
                </div>
            </div>
        )
    }
}