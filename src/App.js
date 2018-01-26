import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizIntro from './components/QuizIntro';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/quiz' component={QuizIntro}/>
                    <Route path='/quiz/questions' component={Quiz}/>
                    <Route path='/quiz/result' component={Result}/>
                </Switch>
                <Footer />
            </div>
      </BrowserRouter>
    );
  }
}

export default App;
