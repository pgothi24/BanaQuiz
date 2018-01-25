import React, { Component } from "react";
import { FormControl, FormGroup } from 'react-bootstrap';

class SearchBar extends Component {
  render() {
    return (
        <div>
            <form>
                <FormGroup>
                    <FormControl bsSize="large" type="text" placeholder="Search"/>
                </FormGroup>
            </form>
        </div>
    );
  }
}

export default SearchBar;
