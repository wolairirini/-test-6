import axios from 'axios';
import {message} from 'antd';

export function dmzGet(){
    return (dispatch)=>{
        return axios({
            url:'/api/acctrl/dmz_get',
        }).then(data=>{
            dispatch({
                type:'DMZ_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            dispatch({
                type:'DMZ_FAILED'
            })
        })
    }
}

export function dmzSet(data){
    return (dispatch)=>{
        dispatch({
            type:'DMZSET_PENDING'
        });
        return axios({
            url:'/api/acctrl/dmz_set',
            method:'post',
            data,
        }).then(data=>{
            dispatch({
                type:'DMZSET_SUCCESS'
            });
            message.success('设置成功');            
        }).catch(err=>{
            dispatch({
                type:'DMZSET_FAILED'
            });
            message.error(err.message);

        })
    }
}