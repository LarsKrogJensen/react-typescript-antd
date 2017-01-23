import * as React from "react";
import {Form, Icon, Input, Button} from "antd";
import {FormProps} from "antd/lib/form/Form";
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
        return <Form inline onSubmit={this.handleSubmit}>
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
                    <Input addonBefore={<Icon type="lock" />}
                           type="password"
                           placeholder="Password"/>
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">Log in</Button>
            </FormItem>
        </Form>

    }
}

const AuthFormer = Form.create({})(AuthForm);
export default AuthFormer