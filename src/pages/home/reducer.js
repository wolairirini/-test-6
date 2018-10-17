const initState = {
    connected:false,
    data:{},
    data_lan:{},
    data_svpn:{},
    data_system:{}
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取外网信息
        case 'GETSTATUS_SUCCESS':
            return Object.assign({},state,{data:payload||state.data,connected:payload.connected});
        case "GETSTATUS_FAILED":
            return Object.assign({},state,{data:state.data});
         // 获取加速信息
        case 'GETSVPNSTATUS_SUCCESS':
            return Object.assign({},state,{data_svpn:payload||state.data_svpn});
        case 'GETSVPNSTATUS_FAILED':
         return Object.assign({},state,{data_svpn:state.data_svpn});
        // 获取内网信息
        case 'GETLANSTATUS_SUCCESS':
            return Object.assign({},state,{data_lan:payload||state.data_lan});
        case 'GETLANSTATUS_FAILED':
            return Object.assign({},state,{data_lan:state.data_lan});
        // 获取系统信息
        case 'GETSYSTEMSTATUS_SUCCESS':
            return Object.assign({},state,{data_system:payload||state.data_system});
        case 'GETSYSTEMSTATUS_FAILED':
            return Object.assign({},state,{data_system:state.data_system});
        default:
            return state;
    }
}