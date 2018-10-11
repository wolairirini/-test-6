import axios from 'axios';
import {message} from 'antd';

//获取静态host列表 
export function get_shost(){
    return (dispatch)=>{
        return axios({
            url:'/api/acctrl/shost_get',
        }).then(data=>{
            dispatch({
                type:'GETSHOST_SUCCESS',
                payload:Array.isArray(data)?data:[]
            })
        }).catch(err=>{
            dispatch({
                type:'GETSHOST_FAILED'
            })
        })
    }
}

// 增加静态host条目
// 打开
export function showModal_Add(){
    return (dispatch)=>{
        return  dispatch({
                    type:'ADDSHOST_OPEN',
                })
            
    }
}

// 取消
export function handleCancel_Add(){
    return (dispatch)=>{
        return  dispatch({
                    type:'ADDSHOST_CLOSE',
                })
            
    }
}

// 确认
export function handleOk_Add(data){
    return (dispatch)=>{
        dispatch({
            type:'ADDSHOST_PENDING',
        })
        return axios({
            url:'/api/acctrl/shost_add',
            method:'post',
            data
        }).then(data=>{
            dispatch({
                type:'ADDSHOST_SUCCESS'
            });
            message.success('修改成功');
        }).catch(err=>{
            console.dir(err)
            dispatch({
                type:'ADDSHOST_FAILED'
            });
            message.error(err.message);
        })
    }
}


// 删除静态host条目
export function cancel_shost(index,record){
    return (dispatch)=>{
        let loadings = {};
        loadings[index] = true;
        dispatch({
            type:'CANCELSHOST_PENDING',
            payload:loadings
        })
        return axios({
            url:'/api/acctrl/shost_del',
            method:'post',
            data:record
        }).then(data=>{
            loadings[index] = false;
            dispatch({
                type:'CANCELSHOST_SUCCESS',
                payload:loadings
            });
            message.success('删除成功');
        }).catch(err=>{
            loadings[index] = false;
            dispatch({
                type:'CANCELSHOST_FAILED',
                payload:loadings
            });
            message.error(err.message);

        })
    }
}