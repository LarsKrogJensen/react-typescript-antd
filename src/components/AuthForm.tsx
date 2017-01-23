import * as React from "react";
import {Form, Icon, Input, Button} from "antd";
const FormItem = Form.Item;

export interface AuthFormProps
{
}
// interface AuthFormState
// {
// }

export class AuthForm extends React.Component<AuthFormProps, any>
{
    constructor(props: AuthFormProps, context: any)
    {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleSubmit(evt: any)
    {
        evt.preventDefault()
    }

    render()
    {
        return <Form inline onSubmit={this.handleSubmit}>
            <FormItem >
                <Input addonBefore={<Icon type="user" />}
                       placeholder="Username"/>
            </FormItem>
            <FormItem>
                <Input addonBefore={<Icon type="lock" />}
                       type="password"
                       placeholder="Password"/>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">Log in</Button>
            </FormItem>
        </Form>

    }
}
