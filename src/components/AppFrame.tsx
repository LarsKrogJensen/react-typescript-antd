import "./app.css";
import * as React from "react";
import {Layout, Row, Col, Input} from "antd";
import {SelectParam} from "antd/lib/menu";
import "../assets/kambi-logo.png";
import {Router, browserHistory} from "react-router";
import {AppNav} from "./AppNav";
import ReactCSSTransitionGroup = require("react-addons-css-transition-group");
import ReactElement = React.ReactElement;
const {Header, Content, Sider} = Layout;
const Search = Input.Search;

export interface AppFrameProps extends Router.RouteComponentProps<any, any>
{
}

interface AppState
{
    collapsed: boolean;
}

type PartialAppState = Partial<AppState>;

export class AppFrame extends React.Component<AppFrameProps, AppState>
{

    constructor(props: AppFrameProps, context: any)
    {
        super(props, context);
        this.state = {collapsed: false};
        //this.onTokenChanged = this.onTokenChanged.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this.onMenuSelected = this.onMenuSelected.bind(this);
    }

    private updateState(state: PartialAppState)
    {
        this.setState({...this.state, ...state})
    }

    // private onTokenChanged(token: api.AccessToken)
    // {
    //     this.updateState({token: token});
    // }

    private onCollapse(collapsed: boolean)
    {
        this.updateState({collapsed: collapsed})
    }

    private onMenuSelected(param: SelectParam)
    {
        console.log(param.key);
        browserHistory.push(param.key)
    }

    private renderLogo(): JSX.Element
    {
        if (this.state.collapsed) {
            return <img width={32} height={32} src="dist/assets/slack.svg"/>
        }

        return <img width={120} height={40} src="dist/assets/slack-logo.svg"/>
    }

    render()
    {
        let pathname = this.props.location.pathname;
        console.log("Current location: " + pathname)

        return (
            <Layout style={{height: '100%'}}>
                <Sider collapsible
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}>
                    <div className="logo">
                        {this.renderLogo()}
                    </div>

                    <AppNav path={pathname}/>
                </Sider>

                <Layout>
                    <Header className="header">
                        <Row type="flex" justify="end" align="middle" style={{height:"100%"}}>
                            <Col>
                                {/*<div style={{color: "white"}}>SOME TEXT</div>*/}
                                <Search
                                    placeholder="input search text"
                                    style={{ width: 200 }}

                                    onSearch={(value: any) => console.log(value)}/>
                            </Col>
                        </Row>
                    </Header>

                    <Layout>
                        <Content style={{ padding: 24 }}>
                            <ReactCSSTransitionGroup
                                component="div"
                                transitionLeave={false}
                                transitionName="example"
                                transitionEnterTimeout={300}>
                            {React.cloneElement(this.props.children as ReactElement<any>, {
                                    key: location.pathname
                                })}
                            </ReactCSSTransitionGroup>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

// function FirstChild(props: AppFrameProps) {
//   const childrenArray: React.ReactChild[] = React.Children.toArray(props.children);
//   return childrenArray[0] ;
// }
