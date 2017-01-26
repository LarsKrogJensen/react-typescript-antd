import {Children} from "react";
import * as React from "react";
import ReactDOM from "react-dom";
// import elementResizeDetectorMaker from 'element-resize-detector'
// import invariant from 'invariant'
import ere = require("element-resize-event");
import ReactInstance = React.ReactInstance;

interface MyState extends ClientRect
{
    initiated: boolean
}
type PartialMyState = Partial<MyState>;

export default class ContainerDimensions extends React.Component<any, MyState>
{
    private parentNode: Node;

    constructor(props: any, context: any)
    {
        super(props, context);
        this.state = {
            initiated: false,
            height: 0,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0
        }
        this.onResize = this.onResize.bind(this)
    }

    static getDomNodeDimensions(node: Element)
    {
        const {top, right, bottom, left, width, height} = node.getBoundingClientRect()

        return {top, right, bottom, left, width, height}
    }

    private updateState(state: PartialMyState)
    {
        this.setState({...this.state, ...state})
    }


    componentDidMount()
    {
        let instance: ReactInstance = this;
        let e = ReactDOM.findDOMNode(instance);
        this.parentNode = e.parentNode
        // this.elementResizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' })
        // this.elementResizeDetector.listenTo(this.parentNode, this.onResize)
        this.onResize()
    }

    componentWillUnmount()
    {
        //this.elementResizeDetector.removeListener(this.parentNode, this.onResize)
    }

    onResize()
    {
        const clientRect = ContainerDimensions.getDomNodeDimensions(this.parentNode as Element)
        this.setState({
                          initiated: true,
                          ...clientRect
                      })
    }

    render()
    {
        let element = <div> not initi </div>

        if (this.state.initiated) {
            if (typeof this.props.children === 'function') {
                const renderedChildren = this.props.children(this.state)
                element = renderedChildren && Children.only(renderedChildren)
            }
            element = Children.only(React.cloneElement(this.props.children, this.state))

        }
        return element
    }
}