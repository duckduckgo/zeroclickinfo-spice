(function (env) {
    "use strict";
    
    var Games;
    
    env.ddg_spice_sports_nfl_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('nfl_games');
        }
        
        DDG.require('sports', function(){
            Games = env.ddg_spice_sports_games;
            
            Games.init(NFLInit);
        });
        
        var NFLInit = function () {
                Spice.add({
                    id: 'nfl_games',
                    name: 'NFL Games',

                    data: Games.transformGameData(apiResult.data),

                    from: apiResult.from,
                    signal: apiResult.signal,

                    meta: $.extend(Games.META, {
                        sourceUrl:  apiResult.url || "http://www.bleacherreport.com/nfl",
                        selectedItem: apiResult.data.most_relevant_game_id,
                    }),

                    templates: $.extend(Games.TEMPLATES, {
                        options: {
                            content: Spice.sports_nfl_games.nfl_score
                        }
                    }),
                    
                    normalize: NFLGameData
                });
            },
        
            NFLGameData = function(attrs) {
                attrs.canExpand = false;
                attrs.relativeDay = Games.getRelativeDay(attrs.scheduled);
                
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
            };
    }

}(this));
