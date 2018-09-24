const LeagueJs = require('leaguejs/lib/LeagueJs');

const HISTORICAL_RESULTS_COUNT = 10;

class LeagueClient {
    constructor(apiKey) {
        this.leagueJs = new LeagueJs(apiKey);
    }

    async getRecentMatchStatsForSummoner(summonerName) {
        const { summoner, matchesDetails } = await fetchRecentMatchStatsForSummoner(this.leagueJs, summonerName);
        return await transformToResponse(this.leagueJs, summoner, matchesDetails);
    }
}
exports.LeagueClient = LeagueClient;

/**
 * Fetch the required data from LoL servers to populate a recent stat summary for a summoner
 * @param {*} leaguejs 
 * @param {*} summonerName 
 */
async function fetchRecentMatchStatsForSummoner(leaguejs, summonerName) {
    console.log("Getting summoner");
    const summoner = await leaguejs.Summoner.gettingByName(summonerName);
    const accountId = summoner.accountId;

    // Get Match List
    console.log('Getting match list');
    const matchList = await leaguejs.Match
        .gettingListByAccount(summoner.accountId,
                              null,
                              { beginIndex: 0, endIndex: HISTORICAL_RESULTS_COUNT });
    const matches = matchList.matches;
    const totalMatches = matchList.totalGames;

    // Getting Match Details
    const matchesDetailsPromises = [];
    matches.forEach(matchSummary => {
        const gameId = matchSummary.gameId;
        console.log(`Getting match list for match ${gameId}`);
        matchesDetailsPromises.push(leaguejs.Match.gettingById(gameId));
    });

    const matchesDetails = await Promise.all(matchesDetailsPromises);
    return { summoner, matchesDetails };
}

async function transformToResponse(leaguejs, summoner, matchesDetails) {
    const promises = matchesDetails.map(match => getMatchDto(leaguejs, summoner, match));
    const response = await Promise.all(promises);
    return response;
}

async function getMatchDto(leaguejs, summoner, match) {
    console.log("getting match dto");

    // Find the participant in the result
    const participantIds = match.participantIdentities || [];
    const participantId = participantIds.find(pId => pId.player.accountId === summoner.accountId);
    if (!participantId) {
        throw `Unexpecte error: Summoner not found in match`;
    }

    const participants = match.participants || [];
    const participant = participants.find(p => p.participantId === participantId.participantId);
    if (!participantId) {
        throw `Unexpecte error: Participant not found for matching participant id`;
    }

    const retval = {
        victory: participant.stats.win,
        length: match.gameDuration,
        summoner: {
            name: summoner.name,
            spells: [],
            runes: []       // TODO: Investigate why leaguejs isn't returning Rune data
        },
        champion: {
            name: '',
            level: participant.stats.champLevel
        },
        kills: participant.stats.kills,
        deaths: participant.stats.deaths,
        assists: participant.stats.assists,
        items: [],
        creepScore: {
            perMinute: 0,
            total: getTotalCreepScore(participant)
        }
    }

    retval.summoner.spells = await getSpellNames(leaguejs, [participant.spell1Id, participant.spell2Id]);
    retval.champion.name = await getChampionName(leaguejs, participant.championId);
    retval.items = await getItemNames(leaguejs, [
        participant.stats.item0,
        participant.stats.item1,
        participant.stats.item2,
        participant.stats.item3,
        participant.stats.item4,
        participant.stats.item5,
        participant.stats.item6
    ]);
    retval.creepScore.perMinute = retval.creepScore.total / (retval.length / 60);

    return retval;
}

async function getSpellNames(leaguejs, ids) {
    const promises = ids.filter(id => id !== undefined)
                        .map(id => leaguejs.StaticData.gettingSummonerSpellsById(id))
    const spells = await Promise.all(promises);
    return spells.map(spell => spell.name);
}

async function getChampionName(leaguejs, id) {
    const champ = await leaguejs.StaticData.gettingChampionById(id);
    return champ ? champ.name : undefined;
}

async function getItemNames(leaguejs, ids) {
    // TODO: Investigate why leaguejs is not returning static item data
    const promises = ids.filter(id => id !== undefined)
                        .map(id => Promise.resolve(id));
    const spells = await Promise.all(promises);
    return spells.map(spell => spell.name);
}

function getTotalCreepScore(participant) {
    let sum = 0;

    const creepsPerMin = participant.timeline.creepsPerMinDeltas || {};
    for (let creep in creepsPerMin) {
        sum += creepsPerMin[creep];
    }

    return sum;
}