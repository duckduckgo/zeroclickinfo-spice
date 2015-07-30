(function (env) {
    "use strict";

    env.ddg_spice_sports_nfl_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('nfl_games');
        }
        
        DDG.require('moment.js', function(){
            Spice.add({
                id: 'nfl_games',
                name: 'NFL Games',

                data: apiResult.data.games,

                from: apiResult.from,
                signal: apiResult.signal,

                meta: {
                    idField: 'id',
                    showMoreAt: true,
                    sourceIcon: false,
                    sourceUrl:  apiResult.url || "http://www.bleacherreport.com/nfl",
                    sourceName: 'Bleacher Report',
                    secondaryText: '<span class="tx-clr--grey-dark">Data from Sportradar</span>',
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
                        content: Spice.sports_nfl_games.nfl_score
                    },
                    elClass: {
                        tileExpand: "c-score__foot-icon"
                    }
                },
                
                normalize: function(attrs) {
                    attrs.canExpand = false;
                    attrs.relativeDay = getRelativeDay(attrs.scheduled);
                    
                    // Game Finished/In-Progress
                    if (attrs.last_event) {
                        attrs.has_started = true;
                        attrs.canExpand = true;
                            
                        if (attrs.completed) {
                            attrs.textTotal = l("Final");
                            attrs.textGameOver = l("Game ended");
                        } else {
                            attrs.is_playing = true;
                            attrs.textTotal = l("Score");
                            attrs.textLastUpdate = l("As of %s", Handlebars.helpers.momentTime(attrs.last_event.updated));
                        }
                    }
                    
                    return attrs;
                }
            });
        });
        
        var getRelativeDay = function(dateStr) {
            var today = moment(),
                date = moment.utc(dateStr).local(),
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
        };
    }

}(this));
