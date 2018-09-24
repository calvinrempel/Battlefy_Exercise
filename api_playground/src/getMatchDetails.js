const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

exports.action = function(leaguejs) {
    // Get the recent match info for summoner with given name, write to json file in 'output', and exit the process.
    async function getAndDisplayMatchInfo(leaguejs, summonerName) {
        
        const matchesToList = 5; // Set a low limit (5) in testing just to avoid rate limiting
        const timestamp = (new Date()).getTime();
    
        const summoner = await leaguejs.Summoner.gettingByName(summonerName);
        const accountId = summoner.accountId;
    
        // Write summoner details to file
        const summonerFilepath = path.normalize(
            path.join('output', `summoner.${summonerName}.${timestamp}.json`)
        );
        fs.writeFileSync(summonerFilepath,
                         JSON.stringify(summoner, null, 4),
                         {encoding: 'UTF-8'});
    
        console.log(`Summoner Data written to: ${summonerFilepath}`);
    
        // Get Match Data
        const matchList = await leaguejs.Match.gettingListByAccount(summoner.accountId, null, {beginIndex: 0, endIndex: 5});
        const matches = matchList.matches;
        const totalMatches = matchList.totalGames;
    
        const matchesDetailsPromises = [];
        matches.forEach(matchSummary => {
            const gameId = matchSummary.gameId;
            const champion = matchSummary.champion;
            const time = matchSummary.timestamp;
            
            matchesDetailsPromises.push(leaguejs.Match.gettingById(gameId));
        });
    
        const matchesDetails = await Promise.all(matchesDetailsPromises);
    
        // Write match details to file
        const matchesFilepath = path.normalize(
            path.join('output', `matches.${summonerName}.${timestamp}.json`)
        );
        fs.writeFileSync(matchesFilepath,
                         JSON.stringify(matchesDetails, null, 4),
                         {encoding: 'UTF-8'});
    
        console.log(`Match Data written to: ${matchesFilepath}`);
    
        process.exit();
    }
    
    // Ask user for a summonerName, then get recent match info and exit
    prompt.get(['summonerName'], (err, result) => {
        const summonerName = result.summonerName;
        getAndDisplayMatchInfo(leaguejs, summonerName);
    });
}
