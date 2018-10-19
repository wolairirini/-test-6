import axios from 'axios';
import {message} from 'antd';
// 获取内网口信息
export function lanGet(){
    return (dispatch)=>{
        return axios({
            url:'/api/lan/get',
        }).then(data=>{
            // console.log(data);
            dispatch({
                type:'LANGET_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            dispatch({
                type:'LANGET_FAILED'
            });
        })
    }
}

//内网口设置
export function lanSet(data){
    console.log(data)
    return (dispatch)=>{
        dispatch({
            type:'LANSET_PENDING'
        })
        return axios({
            url:'/api/lan/set',
            method:'post',
            data:data
        }).then(data=>{
            message.success('设置成功');
            dispatch({
                type:'LANSET_SUCCESS'
            })
        }).catch(err=>{
            // console.log(err)
            dispatch({
                type:'LANSET_FAILED'
            });
            message.error(err.message);
        })
    }
}