import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import api from '../api/api';

const FormItem = Form.Item;

class UnwrappedSignUpForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, email, password } = values;

        const res = await api.signUp(email, username, password);

        this.props.setUser(res.data.user);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { className } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={`${className} login-form`}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SignUpForm = Form.create()(UnwrappedSignUpForm);

export default styled(SignUpForm)`
  /* max-width: 300px; */

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
`;
