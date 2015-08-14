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

        /**
         * initialize boxscore answer
         *
         * called from the individual sports functions to ensure
         *  any relevant/required libraries are loaded (e.g. moment)
         *
         * @param {function} callback - Required callback function
         */
        init: function(callback) {
            DDG.require('moment.js', function() {
                callback();
            });
        },

        /**
         * set attrs
         *
         * handles some of the default normalizing steps
         * that all sports will end up doing
         *
         * @param {Object} attrs
         *
         * returns {Object} attrs
         */
        normalize: function(attrs) {
            attrs.canExpand = false;
            attrs.relativeDay = this.getRelativeDay(attrs.start_time);

            // Game Finished/In-Progress
            if (attrs.has_started) {
                attrs.canExpand = true;
            
                // Game is Finished/In-Progress
                if (attrs.has_started) {
                    attrs.canExpand = true;

                     // Game is Finished
                    if (attrs.has_ended) {
                        attrs.textTotal = l("Final");

                    // Game is in-progress
                    } else {
                        attrs.is_playing = true;
                        attrs.textTotal = l("Score");
                        attrs.textLastUpdate = this.getLastUpdate(attrs.updated);
                    }
                }
            }
            
            return attrs;
        },

        /**
         * change data.games
         *
         * manipulates the game data to ensure that the most
         * relevant games are displayed in certain scenarios
         *
         * @param {Object} data - the full data response from the server
         * @param {string} [data.most_relevant_game_id] - determines the most important game to show
         *
         * returns data.games
         */
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

        /**
         * get relativeDay
         *
         * use moment.js to determine if the game's
         * start time is 'today', 'tomorrow', or 'yesterday'
         *
         * @param {string} datrStr - expected format in DATE_FORMAT var
         *
         * returns a localized string
         */
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
        
        /**
         * modify score.home && score.away
         *
         * fills the scoring sequence with placeholder data
         * so that we always display a minimum of 4 quarters, etc
         *
         * @param {Object} score - boxscore object
         * @param {Object} ops - loop parameters
         * 
         * Sub-parameters for ops:
         * @param {string} ops.current - currently active scoring sequence
         * @param {string} ops.name - name of the scoring sequence object (e.g. 'innings', 'scoring')
         * @param {string} ops.counter - name of the counting parameter that the template uses
         * @param {number} ops.min - minimum number of scoring periods
         * @param {Object} [ops.obj] - dummy object for empty scoring fields (i.e. placeholder content)
         *
         * returns the modified boxscore
         */
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

        /**
         * get textLastUpdate
         *
         * returns text with the last updated timestamp if the data
         * is potentially stale 
         *
         * @param {string} dateStr
         *
         * returns a localized text string including the local time of the last update
         */
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
