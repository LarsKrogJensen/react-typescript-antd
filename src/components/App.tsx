import "./app.css";
import * as React from "react";
import {api} from "../util/api";
import {Layout, Menu, Icon, Row, Col} from "antd";
import {AuthForm} from "./AuthForm";
import {SelectParam} from "antd/lib/menu";
import {SearchPanel} from "./SearchPanel";
import {GridTest} from "./GrdTest";
// import logo from "../kambi.png";
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
            return <AuthForm/>
        }
        if (panelKey == "search") {
            return <SearchPanel/>
        }
        if (panelKey == "test") {
            return <GridTest/>
        }
    }

    render()
    {
        return  <Layout style={{height: '100%', background: 'white'}}>
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>
                {/*<div className="logo">*/}
                    {/**/}
                {/*</div>*/}
                <img width={64} height={64} src="data:image/png;base64,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"/>
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
                    {this.renderContent()}
                </Content>
            </Layout>
        </Layout>
    }
}
