const initState = {
    enable:false,
    host:'',
    loading:false
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 获取当前dmz配置
        case 'DMZ_SUCCESS':
            return Object.assign({},state,{enable:payload.enable,host:payload.host});
        case "DMZ_FAILED":
            return Object.assign({},state,{enable:state.enable,host:state.host});
        // 设置dmz
        case 'DMZSET_PENDING':
            return Object.assign({},state,{loading:true});
        case 'DMZSET_SUCCESS':
            return Object.assign({},state,{loading:false});
        case "DMZSET_FAILED":
            return Object.assign({},state,{enable:state.enable,host:state.host,loading:false});
        default:
            return state;
    }
}