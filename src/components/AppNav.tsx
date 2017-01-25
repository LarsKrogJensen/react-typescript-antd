import * as React from "react";
import {Menu, Icon} from "antd";
import {SelectParam} from "antd/lib/menu";
import "../assets/kambi-logo.png";
import {browserHistory} from "react-router";
import ReactCSSTransitionGroup = require("react-addons-css-transition-group");
import ReactElement = React.ReactElement;

export interface AppNavProps
{
    path: string;
}

interface AppNavState
{
}

export class AppNav extends React.Component<AppNavProps, AppNavState>
{
    constructor(props: AppNavProps, context: any)
    {
        super(props, context);
        this.state = {};
        this.onMenuSelected = this.onMenuSelected.bind(this);
    }

    private onMenuSelected(param: SelectParam)
    {
        console.log(param.key);
        browserHistory.push(param.key)
    }

    render()
    {
        return (
            <Menu theme="dark"
                  mode="inline"
                  onSelect={this.onMenuSelected}
                  selectedKeys={[this.props.path]}>
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
                <Menu.Item key="/dimensions">
                    <Icon type="shrink"/>
                    <span className="nav-text">Dimensions</span>
                </Menu.Item>
            </Menu>
        )
    }
}
