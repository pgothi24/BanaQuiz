import React, { Component } from 'react';
import { PageHeader, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';

export default class QuizIntro extends Component {
    render(){
        return (
            <footer className="navbar navbar-inverse navbar-fixed-bottom">
                    <ul class="nav navbar-nav">
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
            </footer>
        )
    }
}
