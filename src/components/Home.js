import React, { Component } from 'react';
import logo from '../images/logo.png';
import scroll from '../images/scroll.png';
import SearchBar from './SearchBar';
import ThumbnailMain from './ThumbnailMain';

class Home extends Component {
    constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
	}
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event){
        if(window.scrollY > 100)
            document.getElementsByClassName('div-thumbnail')[0].style.visibility = 'visible';
            document.getElementsByClassName('scroll-img')[0].style.display = 'none';
    }
    render() {
        return (
            <div>
                <div className="home">
                    <header className="home-header">
                        <img src={logo} className="home-logo" alt="logo" />
                        <div className="home-title">Fun IQ and Personality quizzes!</div>
                    </header>
                    <SearchBar/>
                    <div className='scroll-img'>
                        <img src={scroll} alt="scroll" />
                    </div>
                </div>
                <div className = 'div-thumbnail'>
                    <ThumbnailMain />
                </div>
            </div>
        );
    }
}
export default Home;
