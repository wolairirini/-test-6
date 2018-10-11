const initState = {
    dataSource:[],
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前终端列表
        case 'GETINFOSIP_SUCCESS':
            return Object.assign({},state,{dataSource:payload});
        case "GETINFOSIP_SUCCESS":
            return Object.assign({},state,{dataSource:state.dataSource});
        default:
            return state;
    }
}