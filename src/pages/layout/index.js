import React,{Component} from "react";
import {Link,Switch,Route} from "react-router-dom";
import Home from "../home";
import Find from "../find";

export default class Layout extends Component{
    render(){
        return(
            <div>
                <header>
                    <nav><Link to="/" >home</Link></nav>
                    <nav><Link to="/find" >find</Link></nav>
                </header>
                <aside>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/find" component={Find} />
                        <Route path="*" component={Home} />
                    </Switch>
                </aside>
            </div>
        )
    }
}