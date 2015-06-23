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
                    item: 'base_expanding_item',
                    options: {
                        content: Spice.sports_mlb_games.mlb_score
                    },
                    elClass: {
                        tileExpand: "c-score__foot-icon"
                    }
                },
                
                normalize: function(attrs) {
                    attrs.canExpand = false;
                    attrs.relativeDay = getRelativeDay(attrs.start_time);
                    
                    // Game Finished/In-Progress
                    if (attrs.has_started) {
                        attrs.canExpand = true;
                        
                        var inning = attrs.score.away.innings.length-1 || -1,
                            placeholderStr = '&nbsp;';
                            
                        if (attrs.has_ended) {
                            placeholderStr = '<span class="tx-clr--grey-light">&bull;</span>';
                            attrs.textTotal = l("Final");
                            attrs.textGameOver = l("Game ended");
                        } else {
                            attrs.textTotal = l("Score");
                            attrs.textLastUpdate = l("Last updated %s", Handlebars.helpers.momentTime(attrs.updated));
                        }
                        
                        // pitch_count contains the current game status
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
            // We do a minor transform on the data to ensure that the 
            // 'most relevant' game appears first.  This is unnecessary
            // in a desktop environment, or perhaps in a multiple-call
            // scenario where there isn't a 'more relevant' game.
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
        
        getRelativeDay = function(dateStr) {
            // moment.js returns 'rounded-down' date diffs
            // based on hours, making it useless for 
            // directly determining relative calendar days.  
            //
            // Thus, this function just uses the diff to determine
            // if the game is within the same week, and determines
            // today/tomorrow/yesterday based on the day of the week.
            //
            // This gets around the sticky end-of-month issues that
            // so many relative date functions encounter. :)
            
            // Weekdays are integers representing Sunday (0) 
            // through Saturday (6).
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
                    // fall through
                    case 6: // Saturday (6) - Sunday (0)
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