import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizIntro from './components/QuizIntro';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Footer from './components/Footer';
import About from './components/About';
import Privacy from './components/Privacy';
import Contact from './components/Contact';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/quiz/:id' component={QuizIntro}/>
                    <Route path='/quiz/:id/questions' component={Quiz}/>
                    <Route path='/quiz/:id/result' component={Result}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/privacy' component={Privacy}/>
                    <Route exact path='/contact' component={Contact}/>
                </Switch>
                <Footer />
            </div>
      </BrowserRouter>
    );
  }
}

export default App;
