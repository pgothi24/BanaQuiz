import React, { Component } from 'react';

export default class QuizIntro extends Component {
    render(){
        return (
            <footer className="navbar navbar-default navbar-fixed-bottom">
                <div className="container container-footer">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/privacy">Privacy</a></li>
                        <li><a href="/contact" className="a-last">Contact</a></li>
                    </ul>
                </div>
            </footer>
        )
    }
}
