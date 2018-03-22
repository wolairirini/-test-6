//全局reducer
const init_state = {
    name:2,
    sex:"male"
}

const globalreducers = {
    name:function(state=init_state.name,action={}){
        const {type,payload} = action;
        switch(type){
            case "GLOBAL_ADD":
                return state+payload;
            default:
                return state;
        }
    },
    sex:function(state=init_state.sex,action={}){
        const {type,payload} = action;
        switch(type){
            default:
                return state;
        }
    },
}

export default globalreducers;