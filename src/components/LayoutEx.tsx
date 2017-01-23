import * as React from "react";
import {Row} from "antd";
import {RowProps} from "antd/lib/grid/row";

export interface PaddingEx
{
    /**
     * The padding optional CSS property sets the required padding space on one to four sides of an element. The padding area is the space between an element and its border. Negative values are not allowed but decimal values are permitted. The element size is treated as fixed, and the content of the element shifts toward the center as padding is increased.
     * The padding property is a shorthand to avoid setting each side separately (padding-top, padding-right, padding-bottom, padding-left).
     */
    padding?: any;

    /**
     * The padding-bottom CSS property of an element sets the padding space required on the bottom of an element. The padding area is the space between the content of the element and its border. Contrary to margin-bottom values, negative values of padding-bottom are invalid.
     */
    paddingBottom?: any;

    /**
     * The padding-left CSS property of an element sets the padding space required on the left side of an element. The padding area is the space between the content of the element and its border. Contrary to margin-left values, negative values of padding-left are invalid.
     */
    paddingLeft?: any;

    /**
     * The padding-right CSS property of an element sets the padding space required on the right side of an element. The padding area is the space between the content of the element and its border. Contrary to margin-right values, negative values of padding-right are invalid.
     */
    paddingRight?: any;

    /**
     * The padding-top CSS property of an element sets the padding space required on the top of an element. The padding area is the space between the content of the element and its border. Contrary to margin-top values, negative values of padding-top are invalid.
     */
    paddingTop?: any;
}
export interface RowExProps extends RowProps, PaddingEx
{

}

export class RowEx extends React.Component<RowExProps, any>
{
    constructor(props: RowExProps, context: any)
    {
        super(props, context);
    }

    render()
    {
        return <Row style={this.props} {...this.props}>{this.props.children}</Row>
    }
}