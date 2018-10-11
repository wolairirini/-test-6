import axios from 'axios';
import Mock from 'mockjs';
Mock.mock('/gettext',{
    text:'string'
})

Mock.mock('/getobj',{
    'lists':[{name:'dick',age:11,sex:'male'}]
})

export function getObj(){
    return (dispatch)=>{
        return axios({url:'/getobj'})
        .then(res=>{
            dispatch({
                type:'GETOBJ_SUCCESS',
                payload:res.data.lists
            })
        }).catch(err=>{
            console.log(err);
            dispatch({
                type:'GETOBJ_FAIL'
            })
        })
    }
}

export function getText(){
    return (dispatch)=>{
        return axios({
            url:'/gettext',
        }).then(res=>{
            const {text} = res.data;
            dispatch({
                type:'GETTEXT_SUCCESS',
                payload:text+Math.random().toFixed(1)
            })
        }).catch(err=>{
            console.log(err)
            dispatch({
                type:'GETTEXT_FAIL'
            })
        })
    }
}