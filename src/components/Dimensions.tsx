import ere = require("element-resize-event");
import * as React from "react";
import * as _ from "lodash";
import "element-resize-event";
import ReactInstance = React.ReactInstance;
import ReactType = React.ReactType;
import ComponentClass = React.ComponentClass;

function defaultGetDimensions(element: Element)
{
    return [element.clientWidth, element.clientHeight]
}
interface DimensionsState
{
    containerWidth?: number;
    containerHeight?: number;
}

// export default function HOCBaseRender<Props, State,  ComponentState>(
//     Comp: new() => React.Component<Props & State, ComponentState>)
// {
//     return class HOCBase extends React.Component<Props, State>
//     {
//         render()
//         {
//             return <Comp {...this.props} {...this.state}/>;
//         }
//     }
// }


export function wrapDimensions<T>({
    getDimensions = defaultGetDimensions,
    debounce = 0,
    debounceOpts = {},
    elementResize = false
} = {})
{
    return (ComposedComponent: ComponentClass<T>) =>
    {
        return class DimensionsHOC extends React.Component<T, DimensionsState>
        {

            // constructor(props: any, context: DimensionsState)
            // {
            //     super(props, context);
            // }

            // ES7 Class properties
            // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers
            state = {
                containerWidth: 0,
                containerHeight: 0,
            }

            _parent?: Element
            rqf: number
            // Using arrow functions and ES7 Class properties to autobind
            // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#arrow-functions

            // Immediate updateDimensions callback with no debounce
            updateDimensionsImmediate = () =>
            {
                const dimensions = getDimensions(this._parent)

                if (dimensions[0] !== this.state.containerWidth ||
                    dimensions[1] !== this.state.containerHeight) {
                    this.setState({
                                      containerWidth: dimensions[0],
                                      containerHeight: dimensions[1]
                                  })
                }
            }

            // Optionally-debounced updateDimensions callback
            updateDimensions = debounce === 0 ? this.updateDimensionsImmediate
                : _.debounce(this.updateDimensionsImmediate, debounce, debounceOpts)

            onResize = () =>
            {
                if (this.rqf) return
                this.rqf = this.getWindow().requestAnimationFrame(() =>
                                                                  {
                                                                      this.rqf = null
                                                                      this.updateDimensions()
                                                                  })
            }

            // If the component is mounted in a different window to the javascript
            // context, as with https://github.com/JakeGinnivan/react-popout
            // then the `window` global will be different from the `window` that
            // contains the component.
            // Depends on `defaultView` which is not supported <IE9
            getWindow()
            {
                return window;
                // let doc: Document = this.refs["container"];
                // return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window
            }

            componentDidMount()
            {
                let wrapper = this.refs["wrapper"] as Element
                if (!wrapper) {
                    throw new Error('Cannot find wrapper div')
                }
                this._parent = wrapper.parentNode as Element
                this.updateDimensionsImmediate()
                if (elementResize) {
                    // Experimental: `element-resize-event` fires when an element resizes.
                    // It attaches its own window resize listener and also uses
                    // requestAnimationFrame, so we can just call `this.updateDimensions`.
                    ere(this._parent, this.updateDimensions)
                } else {
                    this.getWindow().addEventListener('resize', this.onResize, false)
                }
            }

            componentWillUnmount()
            {
                this.getWindow().removeEventListener('resize', this.onResize)
                // TODO: remote element-resize-event listener.
                // pending https://github.com/KyleAMathews/element-resize-event/issues/2
            }

            /**
             * Returns the underlying wrapped component instance.
             * Useful if you need to access a method or property of the component
             * passed to react-dimensions.
             *
             * @return {object} The rendered React component
             **/
            // getWrappedInstance()
            // {
            //     return this.refs.wrappedInstance
            // }

            render()
            {
                const {containerWidth, containerHeight} = this.state
                if (this._parent && !containerWidth && !containerHeight) {
                    // only trigger a warning about the wrapper div if we already have a reference to it
                    console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option')
                }
                const wrapperStyle = {
                    overflow: 'visible',
                    height: 0,
                    width: 0
                }
                return (
                    <div style={wrapperStyle} ref='wrapper'>
                        <ComposedComponent
                            {...this.state}
                            {...this.props}
                            //updateDimensions={this.updateDimensions}
                            ref='wrappedInstance'
                        />
                    </div>
                )
            }
        }
    }
}