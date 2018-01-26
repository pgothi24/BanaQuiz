import React, { Component } from 'react';
import { Row, Col, Well } from 'react-bootstrap';

class AnswerListItem extends Component {
  render() {
    let image = this.props.answer.answer_image === null ? "" : <img src={this.props.answer.answer_image} alt="" />
    return (
      <Row onClick={() => this.props.onClickHandler(this.props.answer.answer_text)}>
        <Col xs={12} md={12}>
          <Well bsSize="small" className="answer">
            <div name="answer_text">
              {this.props.answer.answer_text}
            </div>
            <div>
              {image}
            </div>
          </Well>
        </Col>
      </Row>
    );
  }
}

export default AnswerListItem;
