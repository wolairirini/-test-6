const initState = {
    proto:'',
    infos:{},
    wanset:null,
    loading:false
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前外网配置
        case 'WANGET_SUCCESS':
            return Object.assign({},state,{infos:payload||state.infos,proto:payload.proto});
        case "WANGET_FAILED":
            return Object.assign({},state,{infos:state.infos});
        // 外网口设置
        case 'WANSET_PENDING':
            return Object.assign({},state,{loading:true});
        case 'WANSET_SUCCESS':
            return Object.assign({},state,{wanset:true,loading:false});
        case "WANSET_FAILED":
            return Object.assign({},state,{wanset:false,loading:false});
        default:
            return state;
    }
}