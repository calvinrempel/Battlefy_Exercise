const fs = require('fs');
const LeagueClient = require('./src/league-client').LeagueClient;
const ApiServer = require('./src/api-server').ApiServer;

const properties = JSON.parse(fs.readFileSync('./properties.json', {encoding: 'UTF-8'}));
const apiKey = properties.apiKey;
if (!apiKey) {
    throw 'properties.json : apiKey must be provided';
}

const leagueClient = new LeagueClient(apiKey);
const apiServer = new ApiServer(80, leagueClient);

apiServer.listenAndServe();