import * as React from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import {FormProps} from "antd/lib/form/Form";
import "./AuthForm.css"
const FormItem = Form.Item;


export interface AuthFormProps extends FormProps
{
}
// interface AuthFormState
// {
// }

class AuthForm extends React.Component<AuthFormProps, any>
{
    constructor(props: AuthFormProps, context: any)
    {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleSubmit(evt: any)
    {
        evt.preventDefault()
        this.props.form.validateFields((err, values) =>
                                       {
                                           if (!err) {
                                               console.log('Received values of form: ', values);
                                           }
                                       });
    }

    render()
    {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a>register now!</a>
                </FormItem>
            </Form>
        )
    }
}

const WrappedAuthForm = Form.create({})(AuthForm);

export {WrappedAuthForm as AuthForm}