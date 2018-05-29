import React, { Component } from 'react';
import { Layout, Row, Col, Menu, Breadcrumb, Button, Modal } from 'antd';
import styled from 'styled-components';

import './App.css';
import LoginForm from './components/LoginForm';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    user: {},
    token: '',
    loginModalVisible: false,
  };

  toggleLoginModal = () => {
    this.setState({ loginModalVisible: !this.state.loginModalVisible });
  };

  render() {
    const { className } = this.props;
    return (
      <Layout className={`${className} layout`}>
        <Header>
          <Row type="flex" justify="space-between">
            <Col>
              <h3 className="logo">Our List</h3>
            </Col>
            <Col>
              <Button type="primary" onClick={this.toggleLoginModal}>
                Log In
              </Button>
            </Col>
          </Row>
        </Header>
        <Modal
          title="Log In"
          visible={this.state.loginModalVisible}
          onCancel={this.toggleLoginModal}
        >
          <Row type="flex" justify="center">
            <Col>
              <LoginForm />
            </Col>
          </Row>
        </Modal>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            Content
          </div>
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
`;
