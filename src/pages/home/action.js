
export function add(num){
    return {
        type:"ADD_NUM",
        payload:num
    }
}
//异步方法
export function asyncadd(num){
    return (dispatch)=>{
        dispatch({
            type:"ASYNCADD_PENDING",
        });
        return setTimeout(()=>{
            dispatch({
                type:"ASYNCADD_SUCCESS",
                payload:num
            })
        },2000)
    }
}