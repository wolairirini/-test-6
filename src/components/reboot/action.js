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