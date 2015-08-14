(function (env) {
    "use strict";
    
    var Games,
        OPS = {
            _checkClock: true,
            _setOT: true,
            currentName: "quarter",
            counter: "quarter",
            name: "scoring",
            half: 2,
            min: 4
        };
    
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
                // default normalize first
                attrs = Games.normalize(attrs, OPS);

                // Game Finished/In-Progress
                if (attrs.has_started) {

                    // Game is in-progress
                    if (!attrs.has_ended) {

                        attrs.score = Games.fillBoxscore(attrs.score, $.extend(OPS, {
                            obj: {
                                points: Games.PLACEHOLDER
                            }
                        }));

                        // set possession on the relevant team object
                        if (attrs.score.possession.team === attrs.home_team.api_id) {
                            attrs.home_team.has_ball = true;
                        } else {
                            attrs.away_team.has_ball = true;
                        }
                    }
                }
              
                return attrs;
            };
    }

}(this));
