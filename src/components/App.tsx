import "./app.css";
import * as React from "react";
import {api} from "../util/api";
import {Layout, Menu, Icon, Row, Col} from "antd";
import {AuthForm} from "./AuthForm";
import {SelectParam} from "antd/lib/menu";
import {SearchPanel} from "./SearchPanel";
import {GridTest} from "./GrdTest";
import "../assets/kambi-logo.png";
import {Router, hashHistory} from "react-router";
import ReactCSSTransitionGroup = require("react-addons-css-transition-group");
import ReactElement = React.ReactElement;
const {Header, Content, Sider} = Layout;

// const DuckImage = require('../assets/slack.svg');


export interface AppProps extends Router.RouteComponentProps<any, any>
{
}

interface AppState
{
    token?: api.AccessToken;
    collapsed: boolean;
    panelKey: string;
}

type PartialAppState = Partial<AppState>;

export class App extends React.Component<AppProps, AppState>
{

    constructor(props: AppProps, context: any)
    {
        super(props, context);
        this.state = {collapsed: false, panelKey: "auth"};
        this.onTokenChanged = this.onTokenChanged.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this.onMenuSelected = this.onMenuSelected.bind(this);
    }

    private updateState(state: PartialAppState)
    {
        this.setState({...this.state, ...state})
    }

    private onTokenChanged(token: api.AccessToken)
    {
        this.updateState({token: token});
    }

    private onCollapse(collapsed: boolean)
    {
        this.updateState({collapsed: collapsed})
    }

    private onMenuSelected(param: SelectParam)
    {
        console.log(param.key);
        // this.updateState({panelKey: param.key});
        hashHistory.push(param.key)
    }

    private renderContent(): JSX.Element
    {
        let panelKey = this.state.panelKey;
        if (panelKey == "auth") {
            return <AuthForm key="auth"/>
        }
        if (panelKey == "search") {
            return <SearchPanel key="search"/>
        }
        if (panelKey == "test") {
            return <GridTest key="test"/>
        }
    }

    private renderLogo(): JSX.Element
    {
        if (this.state.collapsed) {
            return <img width={24} height={24} src="dist/assets/slack.svg"/>
        }

        return <img width={32} height={32} src="dist/assets/slack.svg"/>
    }


    render()
    {
        console.log("Current location: " + this.props.location.pathname)
        // if (this.props.children == null)
        //     return <div> children null </div>

        return (
            <Layout style={{height: '100%', background: 'white'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                    <div className="logo">
                        {this.renderLogo()}
                    </div>

                    <Menu theme="dark"
                          mode="inline"
                          onSelect={this.onMenuSelected}
                          defaultSelectedKeys={[this.props.location.pathname]}>
                        <Menu.Item key="/auth">
                            <Icon type="user"/>
                            <span className="nav-text">Login</span>
                        </Menu.Item>
                        <Menu.Item key="/search">
                            <Icon type="search"/>
                            <span className="nav-text">Search</span>
                        </Menu.Item>
                        <Menu.Item key="/test">
                            <Icon type="upload"/>
                            <span className="nav-text">Test</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <Row type="flex" justify="end" align="middle" style={{height:"100%"}}>
                            <Col>
                                <div style={{color: "white"}}>SOME TEXT</div>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ padding: 24 }}>
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={50}>
                            {React.cloneElement(this.props.children as ReactElement<any>, {
                                key: location.hash
                            })}
                        </ReactCSSTransitionGroup>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
