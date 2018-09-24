import React, { Component } from 'react';
import './App.css';
import SummonerStatsContainer from './containers/SummonerStatsContainer/SummonerStatsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SummonerStatsContainer />
      </div>
    );
  }
}

export default App;
