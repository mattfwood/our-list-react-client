//@ts-check

import React, { Component, Fragment } from 'react';
import { Col, Input, Card, Icon, Modal } from 'antd';
import { Button, Checkbox, List as ListItem, TextareaItem } from 'antd-mobile';
import styled from 'styled-components';

import api from '../../api/api';

import 'antd-mobile/dist/antd-mobile.css';

const CheckboxItem = Checkbox.CheckboxItem;

class List extends Component {
  state = {
    active: false,
    newTask: '',
  };

  toggleActive = () => {
    this.setState({ active: !this.state.active });
  };

  onChange = value => {
    console.log(value);
  };

  handleTextChange = value => {
    console.log(value);
    this.setState({ newTask: value });
  };

  handleKeyUp = e => {
    // on enter key, add task
    if (e.key === 'Enter') {
      this.addTask();
    }
  };

  addTask = async () => {
    const { newTask } = this.state;
    const { list } = this.props;

    try {
      const res = await api.createTask(newTask, list.id);
      console.log(res);
      this.props.getLists();
      this.setState({ newTask: '' });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { list, className } = this.props;

    const completedTasks = list.tasks.filter(task => task.completed === 1);
    const incompletedTasks = list.tasks.filter(
      task => task.completed === 0
    );
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
          footer={null}
        >
          <ListItem>
            {incompletedTasks.map(task => (
              <CheckboxItem
                key={task.id}
                onChange={() => this.onChange(task.value)}
              >
                {task.name}
              </CheckboxItem>
            ))}
            {completedTasks.map(task => (
              <CheckboxItem
                key={task.id}
                onChange={() => this.onChange(task.value)}
              >
                {task.name}
              </CheckboxItem>
            ))}
            <ListItem.Item>
              <TextareaItem
                value={this.state.newTask}
                placeholder="New Task Name"
                onChange={value => this.handleTextChange(value)}
                onKeyUp={this.handleKeyUp}
              />
              <Button type="primary" onClick={this.addTask}>
                Add Task
              </Button>
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
