const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

exports.action = function(leaguejs) {
    // Get static info for champ
    async function getAndWriteChampInfo(leaguejs, champId) {
        const timestamp = (new Date()).getTime();
        const champ = await leaguejs.StaticData.gettingChampionById(champId);
    
        // Write champ details to file
        const champFilepath = path.normalize(
            path.join('output', `champ.${champId}.${timestamp}.json`)
        );
        fs.writeFileSync(champFilepath,
                         JSON.stringify(champ, null, 4),
                         {encoding: 'UTF-8'});
    
        console.log(`champ Data written to: ${champFilepath}`);
    
        process.exit();
    }
    
    // Ask user for a summonerName, then get recent match info and exit
    prompt.get(['champId'], (err, result) => {
        const champId = result.champId;
        getAndWriteChampInfo(leaguejs, champId);
    });
}
