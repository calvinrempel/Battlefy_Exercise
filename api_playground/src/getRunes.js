const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

exports.action = function(leaguejs) {
    // Get static info for runes
    async function getAndWriteRuneInfo(leaguejs, runeId) {
        const timestamp = (new Date()).getTime();
        const rune = await leaguejs.StaticData.gettingRunesById(runeId);
    
        // Write rune details to file
        const runeFilepath = path.normalize(
            path.join('output', `rune.${runeId}.${timestamp}.json`)
        );
        fs.writeFileSync(runeFilepath,
                         JSON.stringify(runes, null, 4),
                         {encoding: 'UTF-8'});
    
        console.log(`rune Data written to: ${runeFilepath}`);
    
        process.exit();
    }
    
    // Ask user for a rune, then get recent match info and exit
    prompt.get(['runeId'], (err, result) => {
        const runeId = result.runeId;
        getAndWriteRuneInfo(leaguejs, runeId);
    });
}
