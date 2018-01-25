import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ThumbnailList from './ThumbnailList';
import axios from 'axios';
import { setJWTtoken, setThumbnailData } from '../actions/index';

class ThumbnailMain extends Component {
    async componentDidMount(){
        let token = ''
        await axios.post('https://nth-avatar-191412.appspot.com/auth-jwt/', {
            username: 'myfriend',
            password: 'atfiverr'
        }).then((response) => {
            token = response.data
        })
        this.props.setJWTtoken('JWT '+token.token)
        if(this.props.token !== ''){
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                }
            }
            let thumbnailData = {'iq': [], 'fun': [], 'personality': []}
            await axios.get('https://nth-avatar-191412.appspot.com/banaquiz/api/quizzes/', config)
                .then((response) => {
                    console.log(response.data);
                    response.data.map((obj) => {
                        if(obj.category === 'IQ'){
                            thumbnailData.iq.push(obj)
                        } else if(obj.category === 'Fun'){
                            thumbnailData.fun.push(obj)
                        } else if(obj.category === 'Personality'){
                            thumbnailData.personality.push(obj)
                        }
                    })
                    this.props.setThumbnailData(thumbnailData)
                })
        }
    }
    render() {
        if(this.props.thumbData.iq){
            return (
                <div className='thumbnailMain'>
                    <ThumbnailList data={this.props.thumbData.iq} title='IQ Quizzes' type='quiz_iq'/>
                    <ThumbnailList data={this.props.thumbData.personality} title='Personality Quizzes' type='quiz_personality'/>
                    <ThumbnailList data={this.props.thumbData.fun} title='Fun Quizzes' type='quiz_fun'/>
                </div>
            )
        } else {
            return ''
        }
    }
}

function mapStateToProps(state){
    return{
        token: state.quiz.token,
        thumbData: state.quiz.thumbData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setJWTtoken,
                                setThumbnailData,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailMain);
