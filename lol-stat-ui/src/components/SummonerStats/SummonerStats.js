import React, { Component } from 'react';
import { Alert, ListGroup, ListGroupItem, Panel, Glyphicon } from 'react-bootstrap';
import './SummonerStats.css';

import SummonerMatchStats from '../SummonerMatchStats/SummonerMatchStats';
import LoadingIndicator from './../LoadingIndicator/LoadingIndicator';

class SummonerStats extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>Recent Match Results for <span className="summoner-name">{this.props.searchTerm}</span></Panel.Heading>
                {this.currentPartial}
            </Panel>
        );
    }

    get currentPartial() {
        if (this.props.searching) {
            return this.searchingPartial;
        }

        if (this.props.error || !this.props.results) {
            return this.errorResultPartial;
        }

        if (this.props.results.length === 0) {
            return this.noResultsPartial;
        }

        return this.resultsPartial;
    }

    get searchingPartial() {
        return (
            <Panel.Body className="loading-indicator-container text-center">
                <LoadingIndicator />
            </Panel.Body>
        );
    }

    get resultsPartial() {
        return (
            <ListGroup>
                {this.props.results.map(result => 
                    <ListGroupItem key={result.num}>
                        <SummonerMatchStats result={result}/>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }

    get errorResultPartial() {
        return (
            <Panel.Body>
                <Alert bsStyle="danger">
                    An unexpected error occurred! We were unable to fetch your results. Please try again later!
                </Alert>
            </Panel.Body>
        );
    }

    get noResultsPartial() {
        return (
            <Panel.Body>
                <Alert bsStyle="warning">
                    No Results Found!
                </Alert>
            </Panel.Body>
        );
    }
}
export default SummonerStats;