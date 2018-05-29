import React, { Component } from 'react';
import { Row, Col, Button, Input, Card, Icon } from 'antd';
import styled from 'styled-components';

const Search = Input.Search;

class NewListCard extends Component {
  render() {
    return (
      <Row className={this.props.className} gutter={16}>
        <Col span={8}>
          <Card title="Create New List">
            <Search
              placeholder="New List Title"
              onSearch={value => this.props.createList(value)}
              enterButton
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default styled(NewListCard)`
  .anticon-search:before {
    content: '\\E6C0';
  }
`;
