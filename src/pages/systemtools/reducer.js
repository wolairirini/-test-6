const initState = {
    // change_psw
    visible_changepsw:false,
    loading_changepsw:false,
    // restore
    restore:false,
    // restartrouter
    restartrouter:false,
    // sleeper
    visible_sleeper:false,
    loading_sleeper:false,
    infos_sleeper:{},
    set_sleeper:false,
    // levelup
    levelup:false,
    visible_levelup:false,
    loading_levelup:false,
    loading_levelup_close:false,
}

export default function(state=initState,action={}){
    const {type,payload} = action;
    switch(type){
        // 修改密码
        case 'CHANGEPSW_OPEN':
            return Object.assign({},state,{visible_changepsw:true});
        case "CHANGEPSW_CLOSE":
            return Object.assign({},state,{visible_changepsw:false});
        case 'CHANGEPSW_LOADING':
            return Object.assign({},state,{loading_changepsw:true});
        case "CHANGEPSW_SUCCESS":
            return Object.assign({},state,{visible_changepsw:false,loading_changepsw:false});
        case "CHANGEPSW_FAILED":
            return Object.assign({},state,{loading_changepsw:false});
        // 恢复出厂设置
        case "RESTORE_SUCCESS":
            return Object.assign({},state,{restore:true});
        case "RESTORE_FAILED":
            return Object.assign({},state,{restore:false});
        // 重启路由
        case "RESTARTROUTER_SUCCESS":
            return Object.assign({},state,{restartrouter:true});
        case "RESTARTROUTER_FAILED":
            return Object.assign({},state,{restartrouter:false});
        // 定时重启
        case 'SLEEPER_OPEN':
            return Object.assign({},state,{visible_sleeper:true});
        case "SLEEPER_CLOSE":
            return Object.assign({},state,{visible_sleeper:false});
        case 'SLEEPERGET_PENDING':
            return Object.assign({},state,{set_sleeper:false});
        case 'SLEEPERGET_SUCCESS':
            return Object.assign({},state,{infos_sleeper:payload||state.payload});
        case "SLEEPERGET_FAILED":
            return Object.assign({},state,{infos_sleeper:state.payload});
        case 'SLEEPERSET_PENDING':
            return Object.assign({},state,{loading_sleeper:true});
        case "SLEEPERSET_SUCCESS":
            return Object.assign({},state,{loading_sleeper:false,visible_sleeper:false,set_sleeper:true});
        case "SLEEPERSET_FAILED":
            return Object.assign({},state,{loading_sleeper:false});
        // 固件升级
        case 'LEVELUP_OPEN':
            return Object.assign({},state,{visible_levelup:true});
            // 取消升级
        case "LEVELUPCLOSE_LOADING":
            return Object.assign({},state,{loading_levelup_close:true});
        case "LEVELUPCLOSE_SUCCESS":
            return Object.assign({},state,{visible_levelup:false,loading_levelup_close:false});
        case "LEVELUPCLOSE_FAILED":
            return Object.assign({},state,{visible_levelup:false,loading_levelup_close:false});
            // 确认升级
        case 'LEVELUP_LOADING':
            return Object.assign({},state,{loading_levelup:true});
        case "LEVELUP_SUCCESS":
            return Object.assign({},state,{visible_levelup:false,loading_levelup:false,levelup:true});
        case "LEVELUP_FAILED":
            return Object.assign({},state,{loading_levelup:false});
        default:
            return state;
    }
}