import React,{Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getText,getObj} from './action';

@connect(
    state=>({text:state.find.text,lists:state.find.lists}),
    dispatch=>bindActionCreators({getText,getObj},dispatch)
)

export default class Find extends Component{
    render(){
        const {text,lists} = this.props;
        console.log(lists)
        return(
            <div className="find" >
               this is Find
                <p>this is p</p>
                <p>{text}</p>
            </div>
        )
    }
    componentDidMount(){
        const {getText,getObj} = this.props;
        getText();
        getObj();
    }
}