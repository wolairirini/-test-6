const initState = {
    infos:{},
    lanset:null,
    loading:false
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前WAN口信息
        case 'LANGET_SUCCESS':
            return Object.assign({},state,{infos:payload||state.infos});
        case "LANGET_FAILED":
            return Object.assign({},state,{infos:state.infos});
        // 链接
        case 'LANSET_PENDING':
            return Object.assign({},state,{loading:true});
        case 'LANSET_SUCCESS':
            return Object.assign({},state,{lanset:true,loading:false});
        case "LANSET_FAILED":
            return Object.assign({},state,{lanset:false,loading:false});
        // 断开
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