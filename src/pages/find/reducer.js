const initState = {
    text:'123'
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        case "GETTEXT_SUCCESS":
            return Object.assign({},state,{text:payload});
        case "GETTEXT_FAIL":
            return Object.assign({},state,{text:state.text});
        default:
            return state;
    }
}