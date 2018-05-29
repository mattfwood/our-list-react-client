import React, { Component, Fragment } from 'react';
import { Col, Input, Card, Icon, Modal } from 'antd';
import { Button, Checkbox, List as ListItem, TextareaItem } from 'antd-mobile';
import styled from 'styled-components';

import 'antd-mobile/dist/antd-mobile.css';

const CheckboxItem = Checkbox.CheckboxItem;

class List extends Component {
  state = {
    active: false,
  };

  toggleActive = () => {
    this.setState({ active: !this.state.active });
  };

  onChange = value => {
    console.log(value);
  };

  render() {
    const { list, className } = this.props;
    return (
      <div className={className}>
        <Card
          onClick={() => this.setState({ active: true })}
          title={`${list.title} (${list.tasks.length})`}
        >
          {list.tasks.map(task => <div>{task.name}</div>)}
        </Card>
        <Modal
          title={list.title}
          visible={this.state.active}
          onCancel={this.toggleActive}
        >
          <ListItem>
            {list.tasks.map(task => (
              <CheckboxItem
                key={task.id}
                onChange={() => this.onChange(task.value)}
              >
                {task.name}
              </CheckboxItem>
            ))}
            <ListItem.Item>
              <TextareaItem placeholder="New Task Name" onChange={this.onChange} />
              <Button type="primary">Add Task</Button>
            </ListItem.Item>
          </ListItem>
        </Modal>
      </div>
    );
  }
}

export default styled(List)`
  &:hover {
    cursor: pointer;
  }
`;
