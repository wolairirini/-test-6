import axios from 'axios';
// 获取外网信息
export function get_wan_status(){
    return (dispatch)=>{
        return axios({
            url:'/api/wan/get_status',
        }).then(data=>{
            dispatch({
                type:'GETSTATUS_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            // console.log(err)
            dispatch({
                type:'GETSTATUS_FAILED'
            })
        })
    }
}

// 获取加速信息
export function get_svpn_status(){
    return (dispatch)=>{
        return axios({
            url:'/api/svpn/get_status',
        }).then(data=>{
            dispatch({
                type:'GETSVPNSTATUS_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            // console.log(err)
            dispatch({
                type:'GETSVPNSTATUS_FAILED'
            })
        })
    }
}

// 获取内网信息
export function get_lan_status(){
    return (dispatch)=>{
        return axios({
            url:'/api/lan/get_status',
        }).then(data=>{
            // console.log(data)
            dispatch({
                type:'GETLANSTATUS_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            // console.log(err)
            dispatch({
                type:'GETLANSTATUS_FAILED'
            })
        })
    }
}

// 获取系统信息
export function get_system_status(){
    return (dispatch)=>{
        return axios({
            url:'/api/system/get_status',
        }).then(data=>{
            // console.log(data)
            dispatch({
                type:'GETSYSTEMSTATUS_SUCCESS',
                payload:data
            })
        }).catch(err=>{
            // console.log(err)
            dispatch({
                type:'GETSYSTEMSTATUS_FAILED'
            })
        })
    }
}