/**
 * This script only exists to play around with the LeagueJs package,
 * determine how to retrieve match history for a summoner, and 
 * for saving results of the query for inspection purposes.
*/
const path = require('path');
const fs = require('fs');
const prompt = require('prompt');
const LeagueJs = require('leaguejs/lib/LeagueJs');

// Quick and dirty setup to load api key from json
const properties = JSON.parse(fs.readFileSync('./properties.json', {encoding: 'UTF-8'}));
const apiKey = properties.apiKey;
if (!apiKey) {
    throw 'properties.json : apiKey must be provided';
}

// List actions that can be performed from cli
// map action name to a file in ./src that exports a functions 'action(leaguejs)'
const actions = {
    'matches': 'getMatchDetails',
    'spells': 'getSpell',
    'runes': 'getRunes',
    'champ': 'getChamp',
    'item': 'getItem'
};

prompt.get(['action'], (err, result) => {
    const leaguejs = new LeagueJs(apiKey);
    const action = result.action;

    const requireFile = actions[action];
    if (requireFile) {
        const act = require(`./src/${requireFile}`).action(leaguejs);
    }
    else {
        console.error("Invalid Action.", `Valid actions are: ${JSON.stringify(actions)}`);
    }
});
