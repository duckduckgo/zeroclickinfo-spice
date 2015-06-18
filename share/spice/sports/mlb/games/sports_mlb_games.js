(function (env) {
    "use strict";

    env.ddg_spice_sports_mlb_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('mlb_games');
        }
        
        DDG.require('moment.js', function(){
            Spice.add({
                id: 'mlb_games',
                name: 'MLB Games',

                allowMultipleCalls: true,

                data: gameData(apiResult.data),

                from: apiResult.from,
                signal: apiResult.signal,

                noDetail: true,

                meta: {
                    idField: 'id',
                    showMoreAt: true,
                    sourceIcon: false,
                    sourceUrl: "http://www.bleacherreport.com/",
                    sourceName: 'Bleacher Report',
                    secondaryText: '<span class="tx-clr--grey-dark">Data from SportsData</span>',
                    hideModeSwitch: true,
                    selectedItem: apiResult.data.most_relevant_game_id,
                    scrollToSelectedItem: true,
                    itemsHighlight: false,
                    itemsExpand: true,
                    itemType: l("Games")
                },

                templates: {
                    item: 'mlb_score_item'
                },
                
                normalize: function(attrs) {
                    attrs.canExpand = false;
                    attrs.relativeDay = getRelativeday(attrs.start_time);
                    
                    // Game Finished/In-Progress
                    if (attrs.has_started) {
                        attrs.canExpand = true;
                        
                        var inning = attrs.score.away.innings.length-1 || -1,
                            placeholderStr = (attrs.has_ended) ? '<span class="tx-clr--grey-light">&bull;</span>' : '&nbsp;';
                        
                        if (attrs.score.pitch_count) {
                            inning = attrs.score.pitch_count.inning-1;
                            
                            // always display placeholders up to 9 innings
                            for(var i=inning+1; i < 9; i++) {
                                attrs.score.home.innings[i] = 
                                attrs.score.away.innings[i] = { 
                                    runs: "", 
                                    number: i+1, 
                                    sequence: i+1, 
                                    type: "inning" 
                                };
                            }
                            
                            // mark current inning
                            if (attrs.score.pitch_count.inning_half === "B") {
                                attrs.score.home.innings[inning].current = true;
                                attrs.score.pitch_count.half_over = true;
                            } else {
                                attrs.score.away.innings[inning].current = true;
                            }
                        }
                        
                        if (inning > -1 && attrs.score.home.innings[inning].runs === 'X') {
                            // replace un-played inning 'X' with something more stylish
                            attrs.score.home.innings[inning].runs = placeholderStr;
                        }
                    }
                    
                    return attrs;
                }
            });
        });
        
        var gameData = function(data) {
            if (!DDG.device.isMobile || !data.most_relevant_game_id) {
                return data.games; 
            } else if (DDG.device.isMobile && data.most_relevant_game_id) {
                var foundRelevant = false,
                    games = [],
                    i = 0;
                // for historical games on the first call, 
                // only add the most relevant game and one previous
                // (if available)
                for (; i < data.games.length; i++) {
                    if (data.games[i].id === data.most_relevant_game_id) {
                        // most relevant first
                        games.push(data.games[i]);
                        // one historical game if the layout allows for it
                        if (!DDG.device.isMobileLandscape() && data.games[i-1]) { games.push(data.games[i-1]); }
                        foundRelevant = true;
                    } else {
                        if (foundRelevant) {
                            games.push(data.games[i]);
                        } else {
                            continue;
                        }
                    }
                }
                return games;
            }
        },
        
        getRelativeday = function(dateStr) {
            var today = moment(),
                date = moment(DDG.getDateFromString(dateStr)),
                diff = today.diff(date, 'days'),
                dayDiff = today.weekday() - date.weekday();
            
            if (diff > -2 && diff < 7) {
                switch(dayDiff) {
                    case 0:
                        return l("Today");
                        break;
                    case -1:
                    case 6:
                        return l("Tomorrow");
                        break;
                    case 1:
                        return l("Yesterday");
                        break;
                    default:
                        return false;
                        break;
                }
            }
            
            return false;
        };
    }

}(this));