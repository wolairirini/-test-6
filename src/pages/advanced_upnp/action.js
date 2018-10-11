import axios from 'axios';

export function upnpGet(){
    return (dispatch)=>{
        return axios({
            url:'/api/acctrl/upnp_get',
        }).then(data=>{
            dispatch({
                type:'UPNP_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            dispatch({
                type:'UPNP_FAILED'
            })
        })
    }
}

export function upnpGetLeases(){
    return (dispatch)=>{
        return axios({
            url:'/api/acctrl/upnp_get_leases',
        }).then(data=>{
            dispatch({
                type:'UPNPLEASES_SUCCESS',
                payload:Array.isArray(data.leases)?data.leases:[]
            })
        }).catch(err=>{
            dispatch({
                type:'UPNPLEASES_FAILED'
            })
        })
    }
}

export function upnpSet(v){
    console.log(v)
    return (dispatch)=>{
        return axios({
            url:'/api/acctrl/upnp_set',
            method:'post',
            data:{
                'enable':v
            }
        }).then(data=>{
            dispatch({
                type:'UPNPSET_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            console.log(err)
            dispatch({
                type:'UPNPSET_FAILED'
            })
        })
    }
}