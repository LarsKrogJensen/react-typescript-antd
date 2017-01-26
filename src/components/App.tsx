import * as React from "react";
import {AuthForm} from "./AuthForm";
import {SearchPanel} from "./SearchPanel";
import {GridTest} from "./GrdTest";
import "es6-promise";
import {Router, Route, browserHistory, IndexRedirect} from "react-router";
import {NotFound} from "./NotFound";
import {DimensionsTest} from "./DimensionsTest";
import {AppFrame} from "./AppFrame";
import {api} from "../util/api";
import AccessToken = api.AccessToken;

interface AppState
{
    token?: AccessToken
}
export class App extends React.Component<any, AppState>
{

    constructor(props: any, context: any)
    {
        super(props, context);
        this.onTokenChanged = this.onTokenChanged.bind(this)
        this.createAuthView = this.createAuthView.bind(this)
        this.createSearchView = this.createSearchView.bind(this)
        this.state = {}
    }

    private createSearchView()
    {
        return <SearchPanel token={this.state.token}/>
    }

    private createAuthView()
    {
        return <AuthForm onToken={this.onTokenChanged}/>
    }

    private onTokenChanged(token: api.AccessToken)
    {
        this.setState({token: token});
    }

    render()
    {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={AppFrame}>
                    <IndexRedirect to="/auth"/>
                    <Route path="/auth" component={this.createAuthView }/>
                    <Route path="/search" component={this.createSearchView}/>
                    <Route path="/test" component={GridTest}/>
                    <Route path="/dimensions" component={DimensionsTest}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>)
    }
}