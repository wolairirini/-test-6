const initState = {
    text:'123',
    lists:[]
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取对象
        case 'GETOBJ_SUCCESS':
            return Object.assign({},state,{lists:payload});
        case "GETOBJ_FAIL":
            return Object.assign({},state,{lists:state.lists});
        // 获取字符串
        case "GETTEXT_SUCCESS":
            return Object.assign({},state,{text:payload});
        case "GETTEXT_FAIL":
            return Object.assign({},state,{text:state.text});
        default:
            return state;
    }
}