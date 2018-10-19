const initState = {
    dataSource:[],
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前加速列表
        case 'GETINFOSJS_SUCCESS':
            return Object.assign({},state,{dataSource:payload});
        case "GETINFOSJS_FAILED":
            return Object.assign({},state,{dataSource:state.dataSource});
        default:
            return state;
    }
}