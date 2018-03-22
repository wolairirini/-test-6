const initState = {
    num:0,
    isloading:false
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        case "ADD_NUM":
            return Object.assign({},state,{num:state.num+payload});
        case "ASYNCADD_PENDING":
            return Object.assign({},state,{isloading:true});
        case "ASYNCADD_SUCCESS":
            return Object.assign({},state,{isloading:false,num:state.num+payload});
        default:
            return state;
    }
}