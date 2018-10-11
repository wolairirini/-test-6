import axios from 'axios';

export function get_infos_ip(){
    return (dispatch)=>{
        return axios({
            url:'/api/sta/get',
        }).then(data=>{
            dispatch({
                type:'GETINFOSIP_SUCCESS',
                payload:Array.isArray(data)?data:[]
            })
        }).catch(err=>{
            dispatch({
                type:'GETINFOSIP_FAILED'
            })
        })
    }
}
