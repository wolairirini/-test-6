const initState = {
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前内网配置
        case 'LANGET_SUCCESS':
            return Object.assign({},state,{infos:payload});
        case "LANGET_FAILED":
            return Object.assign({},state,{infos:state.infos});
        default:
            return state;
    }
}