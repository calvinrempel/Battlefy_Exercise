const express = require('express');

class ApiServer {
    constructor(port, leagueClient) {
        this.port = port || 80;
        this.leagueClient = leagueClient;
        this.app = express();

        initExpress(this.app, leagueClient);
    }

    listenAndServe() {
        this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }
}
exports.ApiServer = ApiServer;

// Initialize the express server and define routes.
function initExpress(app, leagueClient) {
    // Allow cors requests
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // Get recent match history by summoner
    app.get('/summoner/:summonerName/history', (req, res) => {
        const summonerName = req.params.summonerName;
        console.log(`Fetching recent matches for ${summonerName}`);

        // Validate summonerName may be a real name
        if (summonerName === undefined ||
            summonerName === null ||
            typeof summonerName !== 'string' ||
            summonerName.length === 0) {

            res.sentStatus(400);
            console.log("Bad Request");
            return;
        }

        // Get data from the league client and forward it to
        // the end-user.
        //
        // TODO: The response from leagueClient should be mapped to response dto
        //       to decouple frontend from potential leagueClient modifications. 
        leagueClient.getRecentMatchStatsForSummoner(summonerName)
            .then(data => {
                res.send(data);
                console.log("Request Complete");
            })
            .catch(err => {
                res.sendStatus(500);
                console.error(err);
            });
    });
}