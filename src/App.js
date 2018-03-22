import React,{Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Layout from "./pages/layout";

export default class App extends Component{
    render(){
        return(
            <Provider store={store} >
                <Router>
                    <Layout/>
                </Router>
            </Provider>
        )
    }
}
