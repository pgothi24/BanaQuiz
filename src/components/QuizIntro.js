import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { setQuizData, setJWTtoken, setThumbnailData } from '../actions/index';
import { PageHeader, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';

class QuizIntro extends Component {
    constructor(props){
        super(props);
        this.state = {disabled : true, error: false}
    }
    async componentDidMount(){
        if(this.props.token === '' && this.props.match.params.id){
            let token = ''
            await axios.post('https://nth-avatar-191412.appspot.com/auth-jwt/', {
                username: 'myfriend',
                password: 'atfiverr'
            }).then((response) => {
                token = response.data
            })
            this.props.setJWTtoken('JWT '+token.token)
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }
        if(this.props.token !== '' && this.props.thumbdata !== null ){
            let thumbnailData = {}
            await axios.get('https://nth-avatar-191412.appspot.com/banaquiz/api/quizzes/', config)
                .then((response) => {
                    let data = response.data.sort((a,b) => {
                        return new Date(a.date_created).getTime() > new Date(b.date_created).getTime() ? -1 : 1
                    })
                    data.map((obj) => {
                        if(thumbnailData[obj.category] === undefined){
                            thumbnailData[obj.category] = [obj]
                        } else {
                            thumbnailData[obj.category].push(obj)
                        }
                    })
                    this.props.setThumbnailData(thumbnailData)
                })
        }
        await axios.get('https://nth-avatar-191412.appspot.com/banaquiz/api/quizzes/'+ this.props.match.params.id+'/', config)
        .then((response) => {
                this.props.setQuizData(response.data)
                this.setState({disabled: false})
        }).catch((error) => {
                console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              this.setState({error: true})
        });
    }
    render() {
        let quizInfo = this.props.quizData;
        if(Object.keys(quizInfo).length){
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
                    <Link to={{pathname: '/quiz/'+this.props.match.params.id+'/questions'}}>
                        <div>
                            <Button bsStyle="success" bsSize="large" disabled = {this.state.disabled}>START</Button>
                            </div>
                    </Link>
                </div>
            );
        } else {
            return this.state.error ? 'Some error occured' : 'Loading the quiz...';
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
                                setJWTtoken,
                                setThumbnailData
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizIntro);
