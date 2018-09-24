import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon } from 'react-bootstrap/';

import './SearchInput.css';

class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            value: ''
        }
    }

    handleSearch(e) {
        if (this.state.value && this.state.value.length > 0) {
            this.props.onSearch(this.state.value);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    canSearch() {
        return this.state.value &&
               this.state.value.length > 0 &&
               !this.props.searching;
    }

    get searchBtn() {
        return (
            <InputGroup.Button>
                <Button onClick={this.handleSearch} disabled={!this.canSearch()}>Search</Button>
            </InputGroup.Button>
        );
    }

    get searchingIndicator() {
        return (
            <InputGroup.Addon>
                <Glyphicon glyph="refresh" className="searching-indicator"/>
            </InputGroup.Addon>
        );
    }

    render() {
        const inputAddon = this.props.searching ? this.searchingIndicator : this.searchBtn;

        return (
            <form>
                <FormGroup controlId="searchInput">
                    <InputGroup>
                        <FormControl
                            type="search"
                            value={this.state.value}
                            placeholder="Search Term"
                            onChange={this.handleChange}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.handleSearch(event)
                                }
                            }}
                            disabled={this.props.searching}
                        />
                        {inputAddon}
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }
}
export default SearchInput;