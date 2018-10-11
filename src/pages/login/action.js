import axios from 'axios';
import {message} from 'antd';

//登录
export function login(data){
    return (dispatch)=>{
        dispatch({
            type:'LOGIN_PENDING'
        });
        return axios({
            url:'/api/usr/login',
            method:'get',
            params:data
        }).then(res=>{
            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res
            });
            message.success('登陆成功！')
        }).catch(err=>{
            // console.log(err);
            dispatch({
                type:'LOGIN_FAILED'
            });
            message.error(err.message);
        })
    }
}