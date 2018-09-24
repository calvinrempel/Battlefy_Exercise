
# Value Mappings
| Required Value        | LOL Response Property                                                         |
| --------------------- | ----------------------------------------------------------------------------- |
| outcome (win/loss)    | participants[n].stats.win (bool)                                              |
| length                | gameDuration (sec)                                                            |
| summoner name         | participantIdentities[n].player.summonerName                                  |
| summoner spells       | participants[n].[spell1Id | spell2Id] (int)                                   |
| summoner runes        | participants[n].runes[].runeId (int)                                          |
| champion name         | participants[n].championId (int)                                              |
| KDA                   | participants[n].kills, participants[n].deaths, participants[n].assists        |
| items bought (names)  | itemN [0-6] (int)                                                             |
| champion lvl in match | participants[n].champLevel                                                    |
| total creep score     | participants[n].timeline.creepsPerMinDeltas ({ key: number}) (sum numbers)    |
| creep score/min       | total creep score / length                                                    |

# Additional Mapping Notes
## Summoner Spells
Must make call to static data to get spell name - see sample-spell-response.json for details of response

## Summoner Runes
TODO: LoL appears to not be returning rune info (not enough time to investigate)

## Item names
TODO: LeagueJs not returning results - attempt to investigate if time allows.

## Champion Name
Must make call to static data to get champ name - see sample-champ-data.json for details of response

## Total Creep Score
creepsPerMinDeltas is an object in the form:
 `{
     '0-10': 5,
     '10-20': 10
 }`
 We can ignore the keys and just sum the values to get the total creeps.