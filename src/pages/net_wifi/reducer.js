const initState = {
    infos:{},
    wirelessset:null,
    loading:false
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前外网配置
        case 'WIRELESSGET_SUCCESS':
            return Object.assign({},state,{infos:payload||state.infos});
        case "WIRELESSGET_FAILED":
            return Object.assign({},state,{infos:state.infos});
        // 外网口设置
        case 'WIRELESSSET_PENDING':
            return Object.assign({},state,{loading:true});
        case 'WIRELESSSET_SUCCESS':
            return Object.assign({},state,{wirelessset:true,loading:false});
        case "WIRELESSSET_FAILED":
            return Object.assign({},state,{wirelessset:false,loading:false});
        default:
            return state;
    }
}