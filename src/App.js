import React, { Component } from 'react';
import { Layout, Row, Col, Button, Modal, notification } from 'antd';
import { Grid } from 'antd-mobile';
import styled from 'styled-components';
import copy from 'clipboard-copy';

import './App.css';
import api from './api/api';
import If from './components/utils/If';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import AcceptInviteForm from './components/AcceptInviteForm';
import NewListCard from './components/NewListCard';
import NewGroupCard from './components/NewGroupCard';
import List from './components/list/List';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    user: {},
    loginModalVisible: false,
    signUpVisible: false,
    acceptInviteVisible: false,
    lists: [],
  };

  componentDidMount = async () => {
    // test if the user visited with a group invite token
    const tokenPresent = window.location.href.includes('?token=');

    if (tokenPresent) {
      this.toggleAcceptInvite();
    } else {
      // if they didn't visit with a group token, try to authenticate them normally
      try {
        // check if the user has already logged in
        const token = window.localStorage.getItem('ourListAuthHeaders');

        // if they have, fetch their data and set the user
        if (token) {
          const { data } = await api.me();
          this.setState({ user: data });
          this.getLists();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  getUserInfo = async () => {
    const { data } = await api.me();
    this.setState({ user: data });
    this.getLists();
  };

  toggleLoginModal = () => {
    this.setState({ loginModalVisible: !this.state.loginModalVisible });
  };

  toggleSignUp = () => {
    this.setState({ signUpVisible: !this.state.signUpVisible });
  };

  toggleAcceptInvite = () => {
    this.setState({ acceptInviteVisible: !this.state.acceptInviteVisible });
  };

  setUser = async user => {
    this.setState({
      user,
      loginModalVisible: false,
      signUpVisible: false,
    });

    this.getLists();
  };

  getLists = async () => {
    try {
      const { data } = await api.lists();
      // console.log(data);
      this.setState({ lists: data });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  createList = async title => {
    // console.log(title);
    try {
      const { data } = await api.createList(title);
      // get update lists
      this.getLists();
    } catch (error) {
      console.error(error);
    }
  };

  inviteToken = async () => {
    try {
      const res = await api.token();
      const { token } = res.data;
      const link = `${window.location.href}?token=${token}`;
      // console.log(link);
      copy(link);
      notification.open({
        message: 'Invite Link Copied',
        description:
          'Your invite link was copied to your clipboard! Send this link to someone to have them join your group.',
        duration: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateList = (updatedList) => {
    const { lists } = this.state;
    const listIndex = lists.findIndex(list => list.id === updatedList.id);

    lists[listIndex] = updatedList;
    this.setState({ lists });
  }

  render() {
    const { user, lists } = this.state;
    const { className } = this.props;
    const userActive = Object.keys(user).length > 0;
    const userHasGroup = user.group_id && typeof user.group_id === 'number';
    return (
      <Layout className={`${className} layout`}>
        <Header>
          <Row type="flex" justify="space-between">
            <Col>
              <h3 className="logo">
                {user.group ? user.group.name : 'Our List'}
              </h3>
            </Col>
            <Col>
              <If condition={!userActive}>
                <Button type="primary" onClick={this.toggleLoginModal}>
                  Log In
                </Button>
                <Button type="primary" onClick={this.toggleSignUp}>
                  Sign Up
                </Button>
              </If>
              <If condition={userActive && userHasGroup}>
                <Button type="primary" onClick={this.inviteToken}>
                  Invite to Group
                </Button>
              </If>
            </Col>
          </Row>
        </Header>
        <Modal
          title="Log In"
          visible={this.state.loginModalVisible}
          onCancel={this.toggleLoginModal}
          footer={null}
        >
          <Row type="flex" justify="center">
            <Col>
              <LoginForm setUser={this.setUser} />
            </Col>
          </Row>
        </Modal>
        <Modal
          title="Sign Up"
          visible={this.state.signUpVisible}
          onCancel={this.toggleSignUp}
          footer={null}
        >
          <Row type="flex" justify="center">
            <Col>
              <SignUpForm setUser={this.setUser} />
            </Col>
          </Row>
        </Modal>
        <Modal
          title="Accept Invite To Group"
          visible={this.state.acceptInviteVisible}
          onCancel={this.toggleAcceptInvite}
          footer={null}
        >
          <Row type="flex" justify="center">
            <Col>
              <AcceptInviteForm setUser={this.setUser} />
            </Col>
          </Row>
        </Modal>
        <Content>
          <If condition={userActive && userHasGroup}>
            <NewListCard createList={this.createList} />
            {/* <Row gutter={16}>
              {lists.map(list => (
                <Col key={list.id} xs={12} md={8} bordered={false}>
                  <List list={list} getLists={this.getLists} />
                </Col>
              ))}
            </Row> */}
            <Grid
              className="list-grid-borderless"
              hasLine={false}
              data={lists}
              columnNum={2}
              renderItem={list => <List list={list} getLists={this.getLists} updateList={this.updateList} />}
            />
          </If>
          <If condition={userActive && !userHasGroup}>
            <NewGroupCard getUserInfo={this.getUserInfo} />
          </If>
          <If condition={!userActive}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <h2>Log In or Sign Up To Get Started</h2>
            </div>
          </If>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Our List</Footer>
      </Layout>
    );
  }
}

export default styled(App)`
  .logo {
    color: #fff;
  }

  .group-name {
    text-align: center;
    padding: 8px;
  }

  .list-grid-borderless {
    /* &:before,
    &:after {
      background-color: transparent !important;
      background: transparent !important;
    }

    .am-flexbox-justify-center:after,
    .am-flexbox:after {
      background-color: transparent !important;
      background: transparent !important;
    } */

    .am-grid-item-content {
      padding: 0 !important;
    }

    /* ERASE GRID LINES */
    /* .am-flexbox-item:after,
    .am-flexbox-item:before {
      border-left: 0 !important;
      border-right: 0 !important;
      border-bottom: 0 !important;
      background: transparent !important;
      color: transparent !important;
    } */
  }

  .ant-btn + .ant-btn {
    margin-left: 8px;
  }

  @media only screen and (max-width: 768px) {
    .ant-layout-header {
      padding: 0 25px;
    }
  }
`;
