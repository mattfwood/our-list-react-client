import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class UnwrappedLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { className } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={`${className} login-form`}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(UnwrappedLoginForm);

export default styled(LoginForm)`
  max-width: 300px;

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
`;
