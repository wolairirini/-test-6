import axios from 'axios';
import {message} from 'antd';

// 获取数据
export function get_infos_js(){
    return (dispatch)=>{
        return axios({
            url:'/api/sta/get',
        }).then(data=>{
            dispatch({
                type:'GETINFOSJS_SUCCESS',
                payload:Array.isArray(data)?data:[]
            })
        }).catch(err=>{
            dispatch({
                type:'GETINFOSJS_FAILED'
            })
        })
    }
}
