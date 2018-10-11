import axios from "axios";
import { message} from "antd";

// 打开
export function showModal_Sleeper(){
    return (dispatch)=>{
        return  dispatch({
                    type:'SLEEPER_OPEN',
                })
            
    }
}

// 取消
export function handleCancel_Sleeper(){
    return (dispatch)=>{
        return  dispatch({
                    type:'SLEEPER_CLOSE',
                })
            
    }
}

// 获取定时重启信息
export function timeGet(){
    return (dispatch)=>{
        return axios({
            url:'/api/system/get_tm_rbt',
        }).then(data=>{
            // console.log(data);
            dispatch({
                type:'SLEEPERGET_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            dispatch({
                type:'SLEEPERGET_FAILED'
            });
        })
    }
}

//定时重启设置
export function timeSet(data){
    // console.log(data)
    return (dispatch)=>{
        dispatch({
            type:'SLEEPERSET_PENDING'
        })
        return axios({
            url:'/api/system/set_tm_rbt',
            method:'post',
            data:data
        }).then(data=>{
            message.success('设置成功');
            dispatch({
                type:'SLEEPERSET_SUCCESS'
            })
        }).catch(err=>{
            // console.log(err)
            dispatch({
                type:'SLEEPERSET_FAILED'
            });
            message.error(err.message);
        })
    }
}

