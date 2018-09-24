const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

exports.action = function(leaguejs) {
    // Get static info for item
    async function getAndWriteItemInfo(leaguejs, itemId) {
        const timestamp = (new Date()).getTime();
        const items = await leaguejs.StaticData.gettingItemById(itemId);
    
        // Write item details to file
        const itemFilepath = path.normalize(
            path.join('output', `item.${itemId}.${timestamp}.json`)
        );
        fs.writeFileSync(itemFilepath,
                         JSON.stringify(items, null, 4),
                         {encoding: 'UTF-8'});
    
        console.log(`item Data written to: ${itemFilepath}`);
    
        process.exit();
    }
    
    // Ask user for a summonerName, then get recent match info and exit
    prompt.get(['itemId'], (err, result) => {
        const itemId = result.itemId;
        getAndWriteItemInfo(leaguejs, itemId);
    });
}
