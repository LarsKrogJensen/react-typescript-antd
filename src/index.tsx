import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import "./theme.less";
import {App} from "./components/App";
import {AuthForm} from "./components/AuthForm";
import {SearchPanel} from "./components/SearchPanel";
import {GridTest} from "./components/GrdTest";
import "es6-promise";
import {Router, Route, hashHistory} from "react-router";
import {NotFound} from "./components/NotFound";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/auth" component={AuthForm}/>
            <Route path="/search" component={SearchPanel}/>
            <Route path="/test" component={GridTest}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>,
    document.getElementById("app")
);
