import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import './SummonerMatchStats.css';

class SummonerMatchStats extends Component {
    constructor(props) {
        super(props);
    }

    getSummonerPartial(summoner) {
        return (
            <div>
                <div class="result-set">
                    <span class="field-label">Summoner: </span>
                    <span class="value">{summoner.name}</span>
                </div>
                <div class="result-set">
                    <span class="field-label">Spells: </span>
                    {summoner.spells.map(spell =>
                        <span class="value">
                            {spell}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    getChampionPartial(champion) {
        return (
            <div>
                <div class="result-set">
                    <span class="field-label">Champion: </span>
                    <span class="value">{champion.name}</span>
                </div>
                <div class="result-set">
                    <span class="field-label">Level: </span>
                    <span class="value">{champion.level}</span>
                </div>
            </div>
        );
    }

    getCreepScorePartial(creepScore) {
        return (
            <div>
                <div class="result-set">
                    <span class="field-label">Total Creep Score: </span>
                    <span class="value">{creepScore.total}</span>
                </div>
                <div class="result-set">
                    <span class="field-label">Creep Score per Minute: </span>
                    <span class="value">{Number(creepScore.perMinute).toFixed(2)}</span>
                </div>
            </div>
        );
    }

    getKdaPartial(stats) {
        return (
            <div>
                <div class="result-set">
                    <span class="field-label">Kills: </span>
                    <span class="value">{stats.kills}</span>
                </div>

                <div class="result-set">
                    <span class="field-label">Deaths: </span>
                    <span class="value">{stats.deaths}</span>
                </div>

                <div class="result-set">
                    <span class="field-label">Assists: </span>
                    <span class="value">{stats.assists}</span>
                </div>
            </div>
        );
    }

    render() {
        const victorText = this.props.result.victory ? 'Win!' : 'Loss';

        return (
            <Grid>
                <Row>
                    <Col md={4}>
                        <div class="victor">{victorText}</div>
                        <div>{this.getKdaPartial(this.props.result)}</div>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={6}>
                                <div>{this.getSummonerPartial(this.props.result.summoner)}</div>
                                <div>{this.getChampionPartial(this.props.result.champion)}</div>
                                <div>{this.getCreepScorePartial(this.props.result.creepScore)}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
export default SummonerMatchStats;