const initState = {
    connected:false,
    data:{},
    data_lan:{},
    data_svpn:{}
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取外网信息
        case 'GETSTATUS_SUCCESS':
            return Object.assign({},state,{data:payload,connected:payload.connected});
        case "GETSTATUS_FAILED":
            return Object.assign({},state,{data:state.data});
         // 获取加速信息
        case 'GETSVPNSTATUS_SUCCESS':
            return Object.assign({},state,{data_svpn:payload});
        case 'GETSVPNSTATUS_FAILED':
         return Object.assign({},state,{data_svpn:state.data_svpn});
        // 获取内网信息
        case 'GETLANSTATUS_SUCCESS':
            return Object.assign({},state,{data_lan:payload});
        case 'GETLANSTATUS_FAILED':
            return Object.assign({},state,{data_lan:state.data_lan});
        default:
            return state;
    }
}