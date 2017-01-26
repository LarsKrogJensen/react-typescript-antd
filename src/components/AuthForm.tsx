import * as React from "react";
import * as qs from "qs";
import {browserHistory} from "react-router";
import {Form, Icon, Input, Button, Checkbox, Alert} from "antd";
import {FormProps} from "antd/lib/form/Form";
import "./AuthForm.css";
import {util} from "../util/util";
import {api} from "../util/api";
import {AppStore} from "./AppStore";
import AccessToken = api.AccessToken;
import isNullOrEmpty = util.isNullOrEmpty;

const FormItem = Form.Item;


export interface AuthFormProps extends FormProps
{
    appStore: AppStore
}
interface AuthFormState
{
    loading: boolean;
    username: string;
    password: string;
    remember: boolean;
}

type PartialState = Partial<AuthFormState>

interface SearchQueryParam
{
    goto?: string
}

class AuthForm extends React.Component<AuthFormProps, AuthFormState>
{
    private queryParams: SearchQueryParam = {}

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
        let params = location.search;
        if (params != null) {
            params = params.substr(params.indexOf("?") + 1)
            this.queryParams = qs.parse(params)
        }
        console.log("Location search: " + location.search)
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
        this.updateState({loading: true});
        try {
            this.props.appStore.token = await api.fetchAccessToken(this.state.username, this.state.password)
            this.updateState({loading: false});
            if (this.queryParams.goto != null)
                browserHistory.push(this.queryParams.goto)

        } catch (e) {
            this.props.appStore.token = {
                error: "Authentication failed",
                error_description: e.message
            }
            this.updateState({loading: false});
        }
    }

    private renderForm()
    {
        const {getFieldDecorator} = this.props.form;

        let alert = null;

        let token = this.props.appStore.token;
        if (token != null && token.error != null) {
            alert = (
                <Alert
                    message="Login failed"
                    description={token.error}
                    type="error"
                    showIcon
                />)
        }

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                {alert}
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

    render()
    {
        let token = this.props.appStore.token;
        if (token != null && token.access_token != null) {
            return (
                <Alert
                    message="Authenticated"
                    description="You are already successfully authenticated"
                    type="success"
                    showIcon
                />
            )
        }

        return this.renderForm();
    }
}

const WrappedAuthForm = Form.create({})(AuthForm);

export {WrappedAuthForm as AuthForm}