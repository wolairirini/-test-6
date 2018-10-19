const initState = {
    dataSource:[],
    loading:false,
    ipset:null,
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前终端列表
        case 'GETINFOSIP_SUCCESS':
            return Object.assign({},state,{ipset:false,dataSource:payload});
        case "GETINFOSIP_FAILED":
            return Object.assign({},state,{ipset:false,dataSource:state.dataSource});
        // 修改设备名
        case 'SETINFOSIP_PENDING':
            return Object.assign({},state,{loading:true});
        case 'SETINFOSIP_SUCCESS':
            return Object.assign({},state,{ipset:true,loading:false});
        case "SETINFOSIP_FAILED":
            return Object.assign({},state,{loading:false});
        default:
            return state;
    }
}