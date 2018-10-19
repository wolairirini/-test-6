import React,{Component} from "react";

export default class Header extends Component{
    render(){
        return(
            <div className="footer">
                <p><a target="_blank" href='https://www.jixunjsq.com'>四川极讯网络科技有限公司&nbsp;</a>&copy; 2018 GEEXUN,Inc.All rights reserved</p>
                <p>硬件型号：{} 固件版本：{}</p>
            </div>
        )
    }
}