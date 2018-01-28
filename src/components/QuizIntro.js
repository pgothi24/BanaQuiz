import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { setQuizData } from '../actions/index';
import { PageHeader, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';

class QuizIntro extends Component {
    constructor(props){
        super(props);
        this.state = {disabled : true}
    }
    async componentDidMount(){
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }
        await axios.get('https://nth-avatar-191412.appspot.com/banaquiz/api/quizzes/'+ this.props.location.state.id+'/', config)
        .then((response) => {
                this.props.setQuizData(response.data)
                this.setState({disabled: false})
        });
    }
    render() {
        let quizInfo = this.props.quizData;
        if(quizInfo){
            return (
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
                    <PageHeader className="quizTitle">
                        { quizInfo.title }
                    </PageHeader>
                    {
                        quizInfo.text
                        ?
                            <div className="quizDescription" dangerouslySetInnerHTML={{__html: quizInfo.text}}>
                            </div>
                        :
                        <div className="quizDescription">
                            <img src={quizInfo.thumbnail} className="quizImage" alt="quiz_image" />
                        </div>
                    }
                    <Link to={{pathname: '/quiz/questions'}}>
                        <div>
                            <Button bsStyle="success" bsSize="large" disabled = {this.state.disabled}>START</Button>
                            </div>
                    </Link>
                </div>
            );
        } else {
            return '';
        }

    }
}
function mapStateToProps(state){
    return{
        token: state.quiz.token,
        quizData: state.quiz.quizData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setQuizData,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizIntro);
