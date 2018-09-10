import React,{Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getText} from './action';

@connect(
    state=>({text:state.find.text}),
    dispatch=>bindActionCreators({getText},dispatch)
)

export default class Find extends Component{
    render(){
        const {text} = this.props;
        return(
            <div className="find" >
               this is Find
                <p>this is p</p>
                <p>{text}</p>
            </div>
        )
    }
    componentDidMount(){
        const {getText} = this.props;
        getText();
    }
}