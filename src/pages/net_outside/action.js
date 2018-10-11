import axios from 'axios';
import {message} from 'antd';
// 获取外网口信息
export function wanGet(){
    return (dispatch)=>{
        return axios({
            url:'/api/wan/get',
        }).then(data=>{
            dispatch({
                type:'WANGET_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            console.log(err)
            dispatch({
                type:'WANGET_FAILED'
            })
        })
    }
}

//外网口设置
export function wanSet(data){
    // console.log(data)
    return (dispatch)=>{
        dispatch({
            type:'WANSET_PENDING'
        });
        return axios({
            url:'/api/wan/set',
            method:'post',
            data:data
        }).then(res=>{
            dispatch({
                type:'WANSET_SUCCESS'
            });
            message.success('设置成功');
        }).catch(err=>{
            dispatch({
                type:'WANSET_FAILED'
            });
            message.error(err.message);
        })
    }
}