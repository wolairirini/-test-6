import axios from "axios";
import { message } from "antd";

// 打开
export function showModal_ChangePsw(){
    return (dispatch)=>{
        return  dispatch({
                    type:'CHANGEPSW_OPEN',
                })
            
    }
}

// 取消
export function handleCancel_changepsw(){
    return (dispatch)=>{
        return  dispatch({
                    type:'CHANGEPSW_CLOSE',
                })
            
    }
}

// 确认
export function handleOk_changepsw(data){
    return (dispatch)=>{
        dispatch({
            type:'CHANGEPSW_LOADING',
        })
        return axios({
            url:'/api/system/pwd_set',
            method:'post',
            data
        }).then(data=>{
            dispatch({
                type:'CHANGEPSW_SUCCESS'
            });
            message.success('修改成功');
        }).catch(err=>{
            console.dir(err)
            dispatch({
                type:'CHANGEPSW_FAILED'
            });
            message.error(err.message);
        })
    }
}

