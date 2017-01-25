import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import "./theme.less";
import {App} from "./components/App";
import {AuthForm} from "./components/AuthForm";
import {SearchPanel} from "./components/SearchPanel";
import {GridTest} from "./components/GrdTest";
import "es6-promise";
import {Router, Route, browserHistory, IndexRedirect} from "react-router";
import {NotFound} from "./components/NotFound";
import {DimensionsTest} from "./components/DimensionsTest";
//import * as Dimensions from "react-container-dimensions/lib";

// declare let Dimensions:any
// window["Dimensions"] = Dimensions



ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/auth"/>
            <Route path="/auth" component={AuthForm}/>
            <Route path="/search" component={SearchPanel}/>
            <Route path="/test" component={GridTest}/>
            <Route path="/dimensions" component={DimensionsTest}/>
            <Route path="*" component={NotFound}/>

        </Route>
    </Router>,
    document.getElementById("app")
);
