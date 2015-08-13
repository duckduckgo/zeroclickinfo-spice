(function (env) {
    "use strict";
    
    var DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
    
    env.ddg_spice_sports = {};
    
    env.ddg_spice_sports_games = {
    
        META: {
            idField: 'id',
            showMoreAt: true,
            sourceIcon: false,
            sourceName: 'Bleacher Report',
            secondaryText: '<span class="tx-clr--grey-dark">Data from Sportradar</span>',
            hideModeSwitch: true,
            scrollToSelectedItem: true,
            itemsHighlight: false,
            itemsExpand: true,
            itemType: l("Games")
        },
        
        TEMPLATES: {
            item: 'base_expanding_item',
            elClass: {
                tileExpand: "c-score__foot-icon"
            }
        },

        PLACEHOLDER: '<span class="tx-clr--grey-light">&bull;</span>',
        
        init: function(callback) {
            DDG.require('moment.js', function() {
                callback();
            });
        },
    
        transformGameData: function(data) {
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
                        // limiting to portrait view as there's more vertical space
                        // landscape mode should be more concise
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
        
        getRelativeDay: function(dateStr) {
            var today = moment(),
                date = moment.utc(dateStr, DATE_FORMAT).local(),
                tomorrow = moment().add(1, 'd'),
                yesterday = moment().subtract(1, 'd');

            if (date.isSame(today, 'd')) { 
                return l("Today");
            } else if (date.isSame(yesterday, 'd')) {
                return l("Yesterday");
            } else if (date.isSame(tomorrow, 'd')) {
                return l("Tomorrow");
            } else {
                return false;
            }
        },
        
        // fills the scoring sequence with placeholder data
        // so that we always display a minimum of 4 quarters, etc
        fillBoxscore: function(score, ops) {
            if (!score || !ops) { return; }
            
            for(var i=ops.current; i < ops.min; i++) {
                // create placeholder score object
                score.home[ops.name][i] =
                score.away[ops.name][i] = $.extend({}, ops.obj);

                score.home[ops.name][i][ops.counter] = i + 1;
            }
            
            return score;
        },

        // returns text with the last updated timestamp if the data
        // is potentially stale 
        getLastUpdate: function(dateStr) {
            var now = moment(),
                time = moment.utc(dateStr, DATE_FORMAT).local();

            if (now.diff(time, 'minutes') > 15) {
                return l("Last updated %s", Handlebars.helpers.momentTime(dateStr));
            } else {
                return false;
            }
        }
    };

}(this));
