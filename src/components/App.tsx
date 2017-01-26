import * as React from "react";
import {AuthForm} from "./AuthForm";
import {SearchPanel} from "./SearchPanel";
import {GridTest} from "./GrdTest";
import "es6-promise";
import {Router, Route, browserHistory, IndexRedirect, RouterState} from "react-router";
import {NotFound} from "./NotFound";
import {DimensionsTest} from "./DimensionsTest";
import {AppFrame} from "./AppFrame";
import {api} from "../util/api";
import AccessToken = api.AccessToken;
import {AppStore} from "./AppStore";


export class App extends React.Component<any, any>
{
    private appStore: AppStore = new AppStore();

    constructor(props: any, context: any)
    {
        super(props, context);
        this.onTokenChanged = this.onTokenChanged.bind(this)
        this.createAuthView = this.createAuthView.bind(this)
        this.createSearchView = this.createSearchView.bind(this)
    }

    private createSearchView()
    {
        return <SearchPanel appStore={this.appStore}/>
    }

    private createAuthView()
    {
        return <AuthForm appStore={this.appStore}/>
    }
    private onAuthViewEnter(nextState: RouterState)
    {

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
                    <Route path="/auth" component={this.createAuthView } />
                    <Route path="/search" component={this.createSearchView}/>
                    <Route path="/test" component={GridTest}/>
                    <Route path="/dimensions" component={DimensionsTest}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>)
    }
}