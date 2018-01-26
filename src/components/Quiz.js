import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import Question from './Question';

class Quiz extends Component {
  constructor(props){
    super(props);

    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

    this.questionsList = this.props.quizData.questions;
    this.resultList = this.props.quizData.result_descriptions;
    this.noCorrectResList = {}
    this.state = {
      questionIndex:0,
      score:0,
      structure: this.props.quizData.structure,
      totalQuestions:this.questionsList.length,
      correctAns: '',
    };
  }

  componentDidMount(){
      if(this.state.structure === 'CorrectAnswer'){
          this.setCorrectAnswer();
      }
  }

  setCorrectAnswer(){
    let ansList = this.questionsList[this.state.questionIndex].answers;
    for(var i=0;i<ansList.length;i++){
      if(ansList[i].answer_value === "1"){
        this.setState({ correctAns: ansList[i].answer_text});
        break;
      }
    }
  }

  async onClickHandler(selectedAns) {
    if(this.state.structure === 'CorrectAnswer'){
        await this.setCorrectAnswer();
        if(selectedAns === this.state.correctAns){
          this.setState({score:this.state.score+1});
        }
    } else {
        let ansList = this.questionsList[this.state.questionIndex].answers
        ansList.map((ans) => {
            if(ans.answer_text === selectedAns){
                if(ans.answer_value in this.noCorrectResList){
                    this.noCorrectResList[ans.answer_value] += 1
                } else {
                    this.noCorrectResList[ans.answer_value] = 1
                }
            }
        })
    }
    this.setState({
      questionIndex: this.state.questionIndex+1,
    })
  }

  calculateResult(){
    let resultValue
    if(this.state.structure === 'CorrectAnswer'){
        let resultLen = this.resultList.length-1
        let percent = (this.state.score*100)/this.state.totalQuestions;
        let buckets = 100/this.resultList.length;
        let resultIndex = parseInt(percent/buckets, 10)-1;
        resultIndex = resultIndex === -1 ? Math.abs(0-resultLen) : Math.abs(resultIndex-resultLen);
        resultValue = this.resultList[resultIndex].description;
    } else {
        let maxVal = 0
        let maxKey
        Object.keys(this.noCorrectResList).map((key) => {
            if(this.noCorrectResList[key] > maxVal){
                maxKey = key
                maxVal = this.noCorrectResList[key]
            }
        })
        let result = this.resultList.filter((res) => res.value === maxKey)
        console.log(result);
        resultValue = result[0].description
    }
    return resultValue;
  }

    render() {
        let visited = [];
        for(var i=0;i<this.state.questionIndex;i++){
            visited.push(<div className="circle visited" key={i}></div>);
        }
        let active=[];
        for(i=this.state.questionIndex;i<this.state.totalQuestions;i++){
            active.push(<div className="circle active" key={i}></div>);
        }
        if(this.state.questionIndex < this.state.totalQuestions){
            return (
                <div className="questionMain">
                    <div className="progressBar">
                        {visited}{active}
                    </div>
                    <Question
                        question={this.questionsList[this.state.questionIndex]}
                        onClickHandler={this.onClickHandler}
                    />
                </div>
            );
        }else{
                let result = this.calculateResult();
                let score = this.state.score + "/" + this.state.totalQuestions;
                return <Redirect to={{
                    pathname: '/quiz/result',
                    state: {
                        result,
                        score
                    }
                }} />
            }
    }
}

function mapStateToProps(state){
    return{
        quizData: state.quiz.quizData,
    }
}

export default connect(mapStateToProps)(Quiz);
