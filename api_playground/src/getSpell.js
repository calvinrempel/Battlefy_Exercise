const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

exports.action = function(leaguejs) {
    // Get static info for spell
    async function getAndWriteSpellInfo(leaguejs, spellId) {
        const timestamp = (new Date()).getTime();
        const spells = await leaguejs.StaticData.gettingSummonerSpellsById(spellId);
    
        // Write spell details to file
        const spellFilepath = path.normalize(
            path.join('output', `spell.${spellId}.${timestamp}.json`)
        );
        fs.writeFileSync(spellFilepath,
                         JSON.stringify(spells, null, 4),
                         {encoding: 'UTF-8'});
    
        console.log(`Spell Data written to: ${spellFilepath}`);
    
        process.exit();
    }
    
    // Ask user for a summonerName, then get recent match info and exit
    prompt.get(['spellId'], (err, result) => {
        const spellId = result.spellId;
        getAndWriteSpellInfo(leaguejs, spellId);
    });
}
