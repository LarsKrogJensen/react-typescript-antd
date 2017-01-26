import * as React from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import {FormProps} from "antd/lib/form/Form";
import "./AuthForm.css";
import {util} from "../util/util";
import {api} from "../util/api";
import AccessToken = api.AccessToken;
import isNullOrEmpty = util.isNullOrEmpty;
const FormItem = Form.Item;


export interface AuthFormProps extends FormProps
{
}
interface AuthFormState
{
    token?: AccessToken;
    loading: boolean;
    username: string;
    password: string;
    remember: boolean;
}

type PartialState = Partial<AuthFormState>

class AuthForm extends React.Component<AuthFormProps, AuthFormState>
{
    constructor(props: AuthFormProps, context: any)
    {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loading: false,
            username: "",
            password: "",
            remember: false
        }
    }

    private updateState(state: PartialState, callback?: () => any)
    {
        this.setState({...this.state, ...state}, callback)
    }

    private handleSubmit(evt: any)
    {
        evt.preventDefault()
        this.props.form.validateFields((err, values) =>
                                       {
                                           if (!err) {
                                               console.log('Received values of form: ', values);
                                               this.updateState({
                                                                    loading: true,
                                                                    ...values
                                                                }, () =>
                                                                {
                                                                  this.authenticate()
                                                                })
                                           }
                                       });
    }

    private async authenticate()
    {

        this.updateState({ loading: true });
        try {
            let result: AccessToken = await api.fetchAccessToken(this.state.username, this.state.password);
            console.log("Accesstoken: " + result.access_token + "error: " + result.error)
            this.updateState({ token: result, loading: false});
            //window.localStorage.setItem("api-usr", this.state.username);
            //window.localStorage.setItem("api-pwd", this.state.password);
            //this.props.onToken(result);
        } catch (e) {
            this.updateState({
                              token: {
                                  error: "Authentication failed",
                                  error_description: e.message
                              },
                              loading: false
                          });
        }
    }

    render()
    {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                        initialValue: this.state.username
                    })(
                        <Input addonBefore={<Icon type="user" />}
                               placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                        initialValue: this.state.password
                    })(
                        <Input addonBefore={<Icon type="lock" />}
                               type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: this.state.remember,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary"
                            htmlType="submit"
                            loading={this.state.loading}
                            className="login-form-button">
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