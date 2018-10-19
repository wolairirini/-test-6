import axios from 'axios';

export function get_infos_detail(ip){
    let url = sessionStorage.getItem('infos_detail')==='ip'?'/api/sta/get_ctlist':sessionStorage.getItem('infos_detail')==='js'?'/api/sta/get_btlist':'';
    return (dispatch)=>{
        return axios({
            url,
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
