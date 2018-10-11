import axios from "axios";
import { message } from "antd";

// 打开
export function showModal_Levelup(){
    return (dispatch)=>{
        return  dispatch({
                    type:'LEVELUP_OPEN',
                })
            
    }
}

// 取消
export function handleCancel_Levelup(isUpload){
    isUpload = !isUpload;
    if(isUpload){
        return (dispatch)=>{
            dispatch({
                type:'LEVELUPCLOSE_LOADING',
            })
            return axios({
                url:'/api/upload/cancel',
            }).then(data=>{
                dispatch({
                    type:'LEVELUPCLOSE_SUCCESS',
                });
            }).catch(err=>{
                dispatch({
                    type:'LEVELUPCLOSE_FAILED'
                });
               message.error(err.message);
            })
        }
    }else{
        return (dispatch)=>{
            return  dispatch({
                        type:'LEVELUPCLOSE_SUCCESS',
                    })
                
        }
    }
    
}

// 确认
export function handleOk_Levelup(data){
    return (dispatch)=>{
        dispatch({
            type:'LEVELUP_LOADING',
        })
        return axios({
            url:'/api/upload/do_upgrade',
        }).then(data=>{
            dispatch({
                type:'LEVELUP_SUCCESS'
            });
        }).catch(err=>{
            console.dir(err)
            dispatch({
                type:'LEVELUP_FAILED'
            });
            message.error(err.message);
        })
    }
}

