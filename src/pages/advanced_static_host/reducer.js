const initState = {
    dataSource:[],
    loadings:{},
    visible_Add:false,
    loading_Add:false,
    isCancel:false,
    isAdd:false,
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前静态host列表
        case 'GETSHOST_SUCCESS':
            return Object.assign({},state,{dataSource:payload,isAdd:false,isCancel:false});
        case "GETSHOST_FAILED":
            return Object.assign({},state,{dataSource:state.dataSource,isAdd:false,isCancel:false});
        // 增加条目
        case 'ADDSHOST_OPEN':
            return Object.assign({},state,{visible_Add:true});
        case "ADDSHOST_CLOSE":
            return Object.assign({},state,{visible_Add:false});
        case 'ADDSHOST_PENDING':
            return Object.assign({},state,{loading_Add:true});
        case "ADDSHOST_SUCCESS":
            return Object.assign({},state,{isAdd:true,loading_Add:false,visible_Add:false});
        case "ADDSHOST_FAILED":
            return Object.assign({},state,{loading_Add:false});
        // 删除静态host条目
        case 'CANCELSHOST_PENDING':
            return Object.assign({},state,{loadings:Object.assign({},state.loadings,payload)});
        case 'CANCELSHOST_SUCCESS':
            return Object.assign({},state,{isCancel:true,loadings:Object.assign({},state.loadings,payload)});
        case "CANCELSHOST_FAILED":
            return Object.assign({},state,{loadings:Object.assign({},state.loadings,payload)});
        default:
            return state;
    }
}