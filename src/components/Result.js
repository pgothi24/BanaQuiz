import React, { Component } from 'react';
import { connect } from "react-redux";
import '../App.css';
import { Link } from 'react-router-dom';
import { PageHeader, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import ThumbnailList from './ThumbnailList';

class QuizResult extends Component {

  constructor(props) {
      super(props)
      this.quizId = this.props.quizData.id;
      this.quizType = this.props.quizData.category;
      this.thumbnailData = this.props.thumbData;
      this.structure = this.props.quizData.structure;
  }

  moreQuizList(){
    let data = this.thumbnailData[this.quizType].filter((obj) => obj.id !== this.quizId);
    return <ThumbnailList data={data} title={'More ' +this.quizType+ ' Quizzes'} />
  }

  render() {
    let result = this.props.location.state.result;
    let score = this.props.location.state.score;
    return (
        <div>
          <div className="quizIntro">
            <div className="divHome">
                <Link to={{ pathname: '/' }}>
                    <ButtonGroup>
                        <Button bsStyle="primary" bsSize="large">
                            <Glyphicon glyph="home" />
                        </Button>
                    </ButtonGroup>
                </Link>
            </div>
                <div>
                    <PageHeader className="quizTitle">
                    {
                        this.structure === 'CorrectAnswer' ? score : ''
                    }
                    </PageHeader>
                    <div className="quizDescription" dangerouslySetInnerHTML={{__html: result}}>
                    </div>
                </div>
            <div>
                <Link to={{
                    pathname: '/quiz/'+this.quizId
                    }}>
                    <Button bsStyle="success" bsSize="large" className="btnTryAgain" >
                        <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
                        Try Again
                    </Button>
                </Link>
            </div>
          </div>
          <div className="thumbnailMain">
            { this.moreQuizList() }
          </div>
        </div>
    );
  }
}


function mapStateToProps(state){
    return{
        quizData: state.quiz.quizData,
        thumbData: state.quiz.thumbData,
    }
}

export default connect(mapStateToProps)(QuizResult);
