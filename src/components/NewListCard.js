import React, { Component } from 'react';
import { Row, Col, Button, Input, Card, Icon } from 'antd';
import styled from 'styled-components';

const Search = Input.Search;

class NewListCard extends Component {
  state = {
    newListTitle: '',
  }

  render() {
    return (
      <Row className={this.props.className}>
        <Col span={24}>
          <Card bordered={false}>
            <Search
              placeholder="New List Title"
              onSearch={value => {
                this.props.createList(this.state.newListTitle);
                this.setState({ newListTitle: '' });
              }}
              onChange={(e) => { this.setState({ newListTitle: e.target.value })}}
              value={this.state.newListTitle}
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
