const initState = {
    dataSource:[],
    enable:false
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前upnp配置
        case 'UPNP_SUCCESS':
            return Object.assign({},state,{enable:payload.enable});
        case "UPNP_FAILED":
            return Object.assign({},state,{enable:state.enable});
        // 获取当前upnp列表
        case 'UPNPLEASES_SUCCESS':
            return Object.assign({},state,{dataSource:payload});
        case "UPNPLEASES_FAILED":
            return Object.assign({},state,{dataSource:state.dataSource});
        // 设置upnp
        case 'UPNPSET_SUCCESS':
            return Object.assign({},state,{enable:!state.enable});
        case "UPNPSET_FAILED":
            return Object.assign({},state,{enable:state.enable});
        default:
            return state;
    }
}