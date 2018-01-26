import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Thumbnail extends Component {
  render() {
    return (
        <Link to={{
            pathname: '/quiz',
            state: {
                id: this.props.id,
            }
        }}>
          <div>
            <div>
              <img src={this.props.quizImage} className="thumbnail-image" alt="quiz_image" />
            </div>
            <div className="thumbnail-title">
              {this.props.quizTitle}
            </div>
          </div>
      </Link>
    );
  }
}

export default Thumbnail;
