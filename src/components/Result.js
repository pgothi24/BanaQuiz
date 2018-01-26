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

    if(this.quizType === 'IQ'){
        let data = this.thumbnailData.iq.filter((obj) => obj.id !== this.quizId);
        return <ThumbnailList data={data} title='More IQ Quizzes'/>
    } else if(this.quizType === 'Personality'){
        let data = this.thumbnailData.personality.filter((obj) => {return obj.id !== this.quizId});
        return <ThumbnailList data={data} title='Personality Quizzes'/>
    } else if(this.quizType === 'Fun'){
        let data = this.thumbnailData.fun.filter((obj) => {return obj.id !== this.quizId});
        return <ThumbnailList data={data} title='Fun Quizzes'/>
    }
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
            {
                this.structure === 'CorrectAnswer' ?
                    <div>
                        <PageHeader className="quizTitle">
                          {score}
                        </PageHeader>
                        <div className="quizDescription" dangerouslySetInnerHTML={{__html: result}}>
                        </div>
                    </div>
                :
                    <div className="quizDescription" dangerouslySetInnerHTML={{__html: result}}>
                    </div>
            }
            <div>
                <Link to={{
                    pathname: '/quiz',
                    state: {
                        id:this.quizId,
                        type:this.quizType
                    }
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
