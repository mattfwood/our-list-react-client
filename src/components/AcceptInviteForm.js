import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import api from '../api/api';

const FormItem = Form.Item;

class UnwrappedAcceptInviteForm extends Component {
  state = {
    group: {},
    token: '',
  };

  componentDidMount = async () => {
    try {
      const token = window.location.href.split('?token=')[1];
      const res = await api.getGroup(token);
      this.setState({ group: res.data, token });
    } catch (error) {
      throw new Error(error);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, email, password } = values;
        const { token } = this.state;

        const res = await api.signUp(email, username, password, token);

        // redirect them to page without the token so it can fetch data
        window.location.replace(window.location.origin);
      }
    });
  };

  render() {
    const { group } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { className } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={`${className} login-form`}>
        <div className="accept-invite-instructions">
          <div>You've been invited to join</div>
          <h3>"{group ? group.name : ''}"</h3>
          <div>Finish signing up to get started.</div>
        </div>
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

const AcceptInviteForm = Form.create()(UnwrappedAcceptInviteForm);

export default styled(AcceptInviteForm)`
  /* max-width: 300px; */

  .accept-invite-instructions {
    text-align: center;
    padding: 8px;

    h3 {
      margin: 0;
    }
  }

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
`;
