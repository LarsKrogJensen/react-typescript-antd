import * as React from "react";
// import * as ContainerDimensions from "react-container-dimensions";
// import "react-container-dimensions/lib"

declare let ContainerDimensions:any; // We have no typings

interface SizeProps
{
    containerWidth: number;
    containerHeight: number;
}

export class DimensionsTest extends React.Component<SizeProps, any>
{
    constructor(props: SizeProps, context: any)
    {
        super(props, context);
    }

    


    render(): JSX.Element|any
    {
        return (
            // <ContainerDimensions>
                <div>
                    containerWidth={this.props.containerWidth}
                    containerHeight={this.props.containerHeight}
                </div>
            // </ContainerDimensions>
        )
    }
}


// const Wrapped = Dimensions(DimensionsTest);
//
// export {Wrapped as DimensionsTest}