import axios from "axios";
import { message } from "antd";

// 确认重启
export function handleOk_restartrouter(){
    return (dispatch)=>{
        return axios({
            url:'/api/system/reboot',
        }).then(data=>{
            dispatch({
                type:'RESTARTROUTER_SUCCESS'
            });
            message.success('重启成功');
            sessionStorage.removeItem('reboot');
            setTimeout(()=>{
                window.location.href='/#/login';
            },200);
        }).catch(err=>{
            console.log(err)
            dispatch({
                type:'RESTARTROUTER_FAILED'
            });
            message.error(err.message);
        })
    }
}


