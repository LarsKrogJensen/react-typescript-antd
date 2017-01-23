import {Row, Col} from "antd";
import * as React from "react";

export class GridTest extends React.Component<any, any>
{

    render()
    {
        return <div>
            <Row>
                <Col span={12}><Green>col-12</Green></Col>
                <Col span={12}><Blue>col-12</Blue></Col>
            </Row>
            <Row>
                <Col span={8}><Blue>col-8</Blue></Col>
                <Col span={8}><Green>col-8</Green></Col>
                <Col span={8}><Blue>col-8</Blue></Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}><Green>col-6</Green></Col>
                <Col span={6}><Blue>col-6</Blue></Col>
                <Col span={6}><Green>col-6</Green></Col>
                <Col span={6}><Blue>col-6</Blue></Col>
            </Row>
            <Row type="flex" justify="space-between">
                <Col span={4}><Blue>col-4</Blue></Col>
                <Col span={4}><Green>col-4</Green></Col>
                <Col span={4}><Blue>col-4</Blue></Col>
                <Col span={4}><Green>col-4</Green></Col>
            </Row>
            <Row type="flex" justify="space-around">
                <Col span={4}><Blue>col-4</Blue></Col>
                <Col span={4}><Green>col-4</Green></Col>
                <Col span={4}><Blue>col-4</Blue></Col>
                <Col span={4}><Green>col-4</Green></Col>
            </Row>
            <p>Align Top</p>
            <Row type="flex" justify="center" align="top">
                <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
            </Row>

            <p>Align Center</p>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
            </Row>

            <p>Align Bottom</p>
            <Row type="flex" justify="space-between" align="bottom">
                <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
            </Row>
        </div>
    }
}

const Blue = (props: {children?: any}) => <div style={{background: "blue", color: "white"}}>{props.children}</div>;
const Green = (props: {children?: any}) => <div style={{background: "green", color: "white"}}>{props.children}</div>;

const DemoBox = (props: {children?: any, value: number}) => <p style={{height: props.value, background: "gree"}}>{props.children}</p>;