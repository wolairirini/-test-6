const initState = {
    infos:{},
    lanset:null,
    loading:false,
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前内网配置
        case 'LANGET_SUCCESS':
            return Object.assign({},state,{infos:payload});
        case "LANGET_FAILED":
            return Object.assign({},state,{infos:state.infos});
        // 内网口设置
        case 'LANSET_PENDING':
            return Object.assign({},state,{loading:true});
        case 'LANSET_SUCCESS':
            return Object.assign({},state,{lanset:true,loading:false});
        case "LANSET_FAILED":
            return Object.assign({},state,{lanset:false,loading:false});
        default:
            return state;
    }
}