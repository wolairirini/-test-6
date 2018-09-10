import axios from 'axios';
import Mock from 'mockjs';
Mock.mock('/gettext',{
    text:'string'
})

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