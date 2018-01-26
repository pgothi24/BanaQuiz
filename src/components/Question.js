import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import AnswerListItem from './Answer'

class Question extends Component {
  render() {

    const answerListItem = this.props.question.answers.map(answer => {
      return (
        <AnswerListItem
          key={answer.answer_text}
          answer={answer}
          onClickHandler={this.props.onClickHandler}
        />
      );
    });

    let image = this.props.question.question_image === null ? "" : <img src={this.props.question.question_image} alt="" />
    return (
      <div>
          <Row className="question">
            <Col xs={12} md={12}>{this.props.question.question_text}</Col>
          </Row>
          <Row className="question">
            <Col xs={12} md={12}>
              {image}
            </Col>
          </Row>
          {answerListItem}
      </div>
    );
  }
}

export default Question;
