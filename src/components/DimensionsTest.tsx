import * as React from "react";
import {wrapDimensions} from "./Dimensions";
import {Layout, Row} from "antd";
import ComponentClass = React.ComponentClass;
const {Header, Content, Sider} = Layout;

export interface SizeProps
{
    containerWidth?: number;
    containerHeight?: number;
}

export interface SizeState
{
}

export class DimensionsTest extends React.Component<any, any>
{
    constructor(props: SizeProps, context: any)
    {
        super(props, context);
    }

    render(): JSX.Element|any
    {
        return (
            <div className="box1">
                asalskalska
            </div>
        )
    }
}

class SizedTable extends React.Component<SizeProps, SizeState>
{
    constructor(props: SizeProps, context: any)
    {
        super(props, context);
    }

    render()
    {
        let style = {
            width: this.props.containerWidth,
            height: this.props.containerHeight
        };

        return (<div style={style}>
            containerWidth={this.props.containerWidth}
            containerHeight={this.props.containerHeight}
        </div>)
    }
}


const EnhancedTable = wrapDimensions()(SizedTable)

//export {EnhancedTable as DimensionsTest}