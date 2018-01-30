import React, { Component } from 'react';
import logo from '../images/logo.png';
import scroll from '../images/scroll.png';
import SearchBar from './SearchBar';
import ThumbnailMain from './ThumbnailMain';
import { connect } from "react-redux";
import { BarLoader } from 'react-spinners';

class Home extends Component {
    constructor(props) {
		super(props);
        this.state = { loading: true}
		this.handleScroll = this.handleScroll.bind(this);
	}
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event){
        if(window.scrollY > 10 && Object.keys(this.props.thumbData).length){
            document.getElementsByClassName('div-thumbnail')[0].style.visibility = 'visible';
            document.getElementsByClassName('scroll-img')[0].style.display = 'none';
        }
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
                    {
                        !Object.keys(this.props.thumbData).length ?
                            <div style={{margin:'30%'}}>
                                <h5>Quiz data is being loaded....</h5>
                                <BarLoader
                                    width='100%'
                                    color='#4A90E2'
                                    loading={this.state.loading}
                                />
                            </div>
                        :
                            <div className='scroll-img'>
                                <img src={scroll} alt="scroll" />
                            </div>
                    }
                </div>
                <div className = 'div-thumbnail'>
                    <ThumbnailMain />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        thumbData: state.quiz.thumbData,
    }
}

export default connect(mapStateToProps)(Home);
