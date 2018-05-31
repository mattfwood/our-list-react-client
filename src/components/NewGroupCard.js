import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button } from 'antd';

import api from '../api/api';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UnwrappedNewGroupCard extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // parse form values
        const { groupName } = values;

        try {
          // create group
          const res = await api.createGroup(groupName);

          // update user info with new group
          this.props.getUserInfo();
        } catch (error) {
          throw new Error(error);
        }
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched('groupName') && getFieldError('groupName');
    return (
      <div className={this.props.className}>
        <h3>Name Your Group to Start</h3>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('groupName', {
              rules: [
                { required: true, message: 'Please input your group name!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Group Name"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Create Group
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const NewGroupCard = Form.create()(UnwrappedNewGroupCard);

export default styled(NewGroupCard)`
  padding: 8px;
  text-align: center;
`;
