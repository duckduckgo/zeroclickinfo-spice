(function (env) {
    "use strict";
    
    var DATE_FORMAT = "YYYY-MM-DD HH:mm:ss",
        SCORING_COUNTER = "number";
    
    env.ddg_spice_sports = {};
    
    env.ddg_spice_sports_games = {
    
        META: {
            idField: 'id',
            showMoreAt: true,
            sourceIcon: false,
            sourceName: 'Bleacher Report',
            secondaryText: '<span class="tx-clr--grey-dark">Data from <a class="tx-clr--grey-dark" href="https://sportradar.us/">Sportradar</a></span>',
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
         * set attrs
         *
         * handles some of the default normalizing steps
         * that all sports will end up doing
         *
         * @param {Object} attrs
         * @param {Object} ops
         *
         * returns {Object} attrs
         */
        normalize: function(attrs, ops) {
            ops = ops || {};

            attrs.canExpand = false;
            attrs.relativeDay = this.getRelativeDay(attrs.start_time);

            // Game Finished/In-Progress
            if (attrs.has_started) {
                // set current now so that subroutines don't have to check each time
                attrs.score.current = attrs.score.current || attrs.score[ops.currentName] || 0;

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
                        attrs.textLastUpdate = this.getLastUpdate(attrs.updated, ops.updatedTimeout);

                        // check for the ends of quarters
                        if (ops._checkClock) {
                            attrs = this.getClockStatus(attrs, ops);
                        }

                    }

                    // use standard fields for scoring sequences
                    if (ops._fixCount) {
                        attrs.score = this.normalizeSequence(attrs.score, ops);
                    }

                    // set overtime labels (if necessary)
                    if (ops._setOT) {
                        attrs.score = this.setOvertime(attrs.score, ops);
                    }

                }
            }
            
            return attrs;
        },

        /**
         * loop through each scoring field
         * set predictable field names
         * for shared templates to utilize
         *
         * @param {Object} score
         * @param {Object} ops

         * @param {string} [ops.parent=home] - name of the scoring sequence parent
         * @param {string} ops.name - name of the scoring sequence object (e.g. 'innings', 'scoring')
         * @param {string} ops.counter - name of the counting parameter that exists in the data
         * @param {string} ops.sequenceType - applied directly in the template for variant styling (e.g. narrow innnings)
         */
        normalizeSequence: function(score, ops) {
            var parent = ops.parent || 'home', // should contain 'ops.counter' label used in template
                i = 0;

            for(; i < score[parent][ops.name].length; i++) {

                score[parent][ops.name][i].type = ops.sequenceType;

                score[parent][ops.name][i][SCORING_COUNTER] = score[parent][ops.name][i][ops.counter];
            }

            return score;
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
                // only add the most relevant game
                // (if available)
                for (; i < data.games.length; i++) {
                    if (data.games[i].id === data.most_relevant_game_id) {
                        // most relevant first
                        games.push(data.games[i]);
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
         * @param {number} score.current - currently active scoring sequence
         * @param {string} ops.name - name of the scoring sequence object (e.g. 'innings', 'scoring')
         * @param {number} ops.min - minimum number of scoring periods
         * @param {Object} [ops.obj] - dummy object for empty scoring fields (i.e. placeholder content)
         *
         * returns the modified boxscore
         */
        fillBoxscore: function(score, ops) {
            if (!score || !ops) { return; }

            for(var i = score.current; i < ops.min; i++) {
                // create placeholder score object
                score.home[ops.name][i] =
                score.away[ops.name][i] = $.extend({
                    type: ops.sequenceType
                }, ops.obj);

                score.home[ops.name][i][SCORING_COUNTER] = i + 1;
            }
            
            return score;
        },

        /**
         * get textLastUpdate
         *
         * returns text with the last updated timestamp if the data
         * is potentially stale
         *
         * works on a timer by passing 'updatedTimeout' parameter
         * to the 'normalize' function in the 'ops' object
         *
         * @param {string} dateStr
         * @param {number} timeout - timeout to display 'last updated' in minutes as an integer
         *
         * returns a localized text string including the local time of the last update
         */
        getLastUpdate: function(dateStr, timeout) {
            var now = moment(),
                time = moment.utc(dateStr, DATE_FORMAT).local();

            if (!timeout) {
                return l("As of %s", Handlebars.helpers.momentTime(dateStr));
            } else if (now.diff(time, 'minutes') > timeout) {
                return l("Last updated %s", Handlebars.helpers.momentTime(dateStr));
            } else {
                return false;
            }
        },

        /**
         * change status based on clock
         *
         * Determines whether to display some text
         * instead of the standard game timer,
         * depending on what the clock is reading.
         *
         * @param {Object} attrs - game data object
         * @param {Object} ops - other parameters
         *
         * Sub-parameters for ops:
         * @param {number} attrs.score.current - currently active scoring sequence
         *
         * @param {number} [ops.half] - label as 'Halftime' instead of 'End of...' if matches
         * @param {string} [ops.end=:00] - clock reading at the end of a scoring sequence
         * @param {string} [ops.clock=attrs.score.clock] - alternate clock parameter
         */
        getClockStatus: function(attrs, ops) {
            if (!attrs || !ops || !attrs.score || !attrs.score.current) { return attrs; }

            var clock = ops.clock || attrs.score.clock,
                end = ops.end || ':00';

            if (clock === end) {
                attrs.has_interesting_status = true; // show the status label in the template

                if (ops.half && attrs.score.current === ops.half) {
                    attrs.status = l("Halftime");
                    attrs.is_halftime = true;
                } else {
                    attrs.status = l("End of %s", DDG.getOrdinal(attrs.score.current));
                }
            }

            return attrs;
        },

        /**
         * set overtime labels
         *
         * changes the labels for any scoring periods
         *  beyond the 'maximum' to 'OT'
         * (e.g. 5th quarter -> OT)
         *
         * @param {Object} score - boxscore object
         * @param {Object} ops - loop parameters
         *
         * Sub-parameters for ops:
         * @param {number} score.current - currently active scoring sequence
         * @param {string} [ops.parent=home] - name of the scoring sequence parent
         * @param {string} ops.name - name of the scoring sequence object (e.g. 'innings', 'scoring')
         * @param {number} ops.min - minimum number of scoring periods before labelling overtime
         */
        setOvertime: function(score, ops) {
            if (!score || !ops || !ops.name || !ops.min) { return score; }

            var parent = ops.parent || 'home', // should contain 'ops.counter' label used in template
                i = ops.min;

            for(; i < score[parent][ops.name].length; i++) {
                score[parent][ops.name][i][SCORING_COUNTER] = 'OT';
            }

            if (score.current > ops.min) {
                score.textCurrent = 'OT'
            }

            return score;
        }
    };

}(this));
