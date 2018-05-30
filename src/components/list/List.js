import React, { Component, Fragment } from 'react';
import { Col, Input, Card, Icon, Modal } from 'antd';
import {
  Grid,
  Button,
  Checkbox,
  List as ListComponent,
  TextareaItem,
  InputItem,
} from 'antd-mobile';
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

  onTaskChange = async (task, e) => {
    console.log(task, e.target.value);
    task.completed = task.completed === 0 ? 1 : 0;

    try {
      const res = await api.updateTask(task.id, { updatedTask: task });
      console.log(res);
      this.props.getLists();
    } catch (error) {
      console.error(error);
    }
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
    const incompletedTasks = list.tasks.filter(task => task.completed === 0);

    console.log(completedTasks);
    return (
      <div className={className}>
        <div
          onClick={() => this.setState({ active: true })}
          className="list-content"
          // title={`${list.title} (${list.tasks.length})`}
        >
          <h4>{list.title}</h4>
          {list.tasks.map(task => <div>{task.name}</div>)}
        </div>
        <Modal
          // title={list.title}
          visible={this.state.active}
          onCancel={this.toggleActive}
          footer={null}
        >
          <h2>{list.title}</h2>
          <ListComponent>
            {incompletedTasks.map(task => (
              <CheckboxItem
                key={task.id}
                checked={task.completed}
                onChange={e => this.onTaskChange(task, e)}
              >
                {task.name}
              </CheckboxItem>
            ))}
            {completedTasks.map(task => (
              <CheckboxItem
                key={task.id}
                checked={task.completed}
                onChange={e => this.onTaskChange(task, e)}
              >
                {task.name}
              </CheckboxItem>
            ))}
          </ListComponent>
          <ListComponent>
            <ListComponent.Item>
              <InputItem
                value={this.state.newTask}
                placeholder="New Task Name"
                onChange={value => this.handleTextChange(value)}
                onKeyUp={this.handleKeyUp}
              />
            </ListComponent.Item>
            <ListComponent.Item>
              <Button type="primary" onClick={this.addTask}>
                Add Task
              </Button>
            </ListComponent.Item>
          </ListComponent>
        </Modal>
      </div>
    );
  }
}

export default styled(List)`
  height: 100%;
  width: 100%;
  padding: 8px;

  .list-content {
    height: 100%;
    /* width: 100%; */
    /* margin: 8px; */
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;
