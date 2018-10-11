import axios from "axios";
import { message } from "antd";

// 确认重启
export function handleOk_restore(){
    return (dispatch)=>{
        return axios({
            url:'/api/system/reset'
        }).then(data=>{
            dispatch({
                type:'RESTORE_SUCCESS'
            });
            message.success('初始化成功');
        }).catch(err=>{
            dispatch({
                type:'RESTORE_FAILED'
            });
            message.error(err.message);
        })
    }
}

