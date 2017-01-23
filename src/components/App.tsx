import "./app.css";
import * as React from "react";
import {api} from "../util/api";
import {Layout, Menu, Icon, Row, Col} from "antd";
import {AuthForm} from "./AuthForm";
import {SelectParam} from "antd/lib/menu";
import {SearchPanel} from "./SearchPanel";
import {GridTest} from "./GrdTest";
import "../assets/kambi-logo.png";
import ReactCSSTransitionGroup = require("react-addons-css-transition-group");
const {Header, Content, Sider} = Layout;


export interface AppProps
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
    constructor()
    {
        super();
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
        this.updateState({panelKey: param.key});
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

    render()
    {
        return  <Layout style={{height: '100%', background: 'white'}}>
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>
                <div className="logo">
                    <img width={114} height={32} src="dist/assets/kambi-logo.png"/>
                </div>

                <Menu theme="dark"
                      mode="inline"
                      onSelect={this.onMenuSelected}
                      defaultSelectedKeys={['auth']}>
                    <Menu.Item key="auth">
                        <Icon type="user"/>
                        <span className="nav-text">Login</span>
                    </Menu.Item>
                    <Menu.Item key="search">
                        <Icon type="search"/>
                        <span className="nav-text">Search</span>
                    </Menu.Item>
                    <Menu.Item key="test">
                        <Icon type="upload"/>
                        <span className="nav-text">nav 3</span>
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
                        transitionLeaveTimeout={300}>
                        {this.renderContent()}
                    </ReactCSSTransitionGroup>
                </Content>
            </Layout>
        </Layout>
    }
}
