import React, {  Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import './SummonerStatsContainer.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import SummonerStats from '../../components/SummonerStats/SummonerStats';
import constants from '../../constants';

class SummonerStatsContainer extends Component {
    constructor(props) {
        super(props);

        this.getSummonerStats = this.getSummonerStats.bind(this);

        this.state = {
            searching: false,
            resultsTerm: '',
            results: [],
            error: null
        }
    }

    getSummonerStats(searchTerm) {
        this.setState({ searching: true, resultsTerm: searchTerm });
        axios.get(`http://${constants.BASE_URL}/summoner/${searchTerm}/history`)
            .then((data) => {
                this.setState({ results: data.data, error: false })
            })
            .catch((e) => {
                this.setState({ results: [], error: true })
            })
            .finally(() => {
                this.setState({ searching: false });
            });
    }

    render() {
        return (
            <div className='search-container'>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>Stat Summoner</PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SearchInput onSearch={this.getSummonerStats} searching={this.state.searching}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SummonerStats searching={this.state.searching}
                                           error={this.state.error}
                                           results={this.state.results}
                                           searchTerm={this.state.resultsTerm}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default SummonerStatsContainer