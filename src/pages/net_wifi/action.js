import axios from 'axios';
import {message} from 'antd';
// 获取WIFI信息
export function wirelessGet(){
    return (dispatch)=>{
        return axios({
            url:'/api/wireless/get',
        }).then(data=>{
            dispatch({
                type:'WIRELESSGET_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            console.log(err)
            dispatch({
                type:'WIRELESSGET_FAILED'
            })
        })
    }
}

//WIFI设置
export function wirelessSet(data){
    // console.log(data)
    return (dispatch)=>{
        dispatch({
            type:'WIRELESSSET_PENDING'
        });
        return axios({
            url:'/api/wireless/set',
            method:'post',
            data:data
        }).then(res=>{
            dispatch({
                type:'WIRELESSSET_SUCCESS'
            });
            message.success('设置成功');
        }).catch(err=>{
            dispatch({
                type:'WIRELESSSET_FAILED'
            });
            message.error(err.message);
        })
    }
}