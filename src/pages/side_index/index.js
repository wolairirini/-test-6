import React,{Component} from "react";

export default class SideIndex extends Component{
    render(){
        return(
            <div className="side_index">
                <div className="top">
                    <h2 className="title">加速方法一：</h2>
                    <p className="describe">关注官方微信</p>
                    <p className="describe">下载极迅APP&nbsp;<a href="javascript:void(0)">开启加速</a></p>
                    <img src={require('../../img/index/erweima.png')}/>
                    <p className="tips">扫一扫下载极讯APP</p>
                </div>
                <div className="bottom">
                    <h2 className="title">加速方法二：</h2>
                    <p className="describe">下载极迅路由PC端&nbsp;<a href="javascript:void(0)">开启加速</a></p>
                    <a className="btn">立即下载</a>
                </div>
            </div>
        )
    }
}