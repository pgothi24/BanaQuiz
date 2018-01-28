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
        if(this.props.token !== '' && this.props.thumbdata !== null ){
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                }
            }
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
    }
    render() {
        if(this.props.thumbData !== null){
            return (
                <div className='thumbnailMain'>
                    {
                        Object.keys(this.props.thumbData).map((quizType) => {
                            return (
                                <ThumbnailList data={this.props.thumbData[quizType]} title={quizType +' Quizzes'}/>
                            )
                        })
                    }
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
