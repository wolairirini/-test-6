import axios from 'axios';

export function get_infos_detail(ip){
    return (dispatch)=>{
        return axios({
            url:'/api/sta/get_ctlist',
            method:'post',
            data:{
                ipaddr:ip
            }
        }).then(data=>{
            dispatch({
                type:'GETINFOSDETAIL_SUCCESS',
                payload:Array.isArray(data)?data:[]
            })
        }).catch(err=>{
            dispatch({
                type:'GETINFOSDETAIL_FAILED'
            })
        })
    }
}
