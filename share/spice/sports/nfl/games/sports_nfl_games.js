(function (env) {
    "use strict";
    
    var Games,
        OPS = {
            _checkClock: true,
            _fixCount: true,
            _setOT: true,
            sequenceType: "quarter",
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
                    name: 'NFL',

                    data: Games.transformGameData(apiResult.data),

                    from: apiResult.from,
                    signal: apiResult.signal,

                    meta: $.extend(Games.META, {
                        sourceUrl:  apiResult.url || "http://www.bleacherreport.com/nfl",
                        selectedItem: apiResult.data.most_relevant_game_id,
                    }),

                    templates: $.extend(Games.TEMPLATES, {
                        options: {
                            content: Spice.sports_nfl_games.nfl_score,
                            in_progress: Spice.sports_nfl_games.head_in_progress,
                            head_totals: Spice.sports_nfl_games.head_totals
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

                        // set the active quarter label (if necessary)
                        attrs.score.textCurrent = attrs.score.textCurrent || 'Q'+attrs.score[OPS.counter];

                        // fill boxscore with placeholder data
                        attrs.score = Games.fillBoxscore(attrs.score, $.extend(OPS, {
                            obj: {
                                points: Games.PLACEHOLDER
                            }
                        }));

                        // set possession on the relevant team object
                        if (!attrs.is_halftime) {
                            if (attrs.score.possession.team === attrs.home_team.api_id) {
                                attrs.home_team.has_ball = true;
                                attrs.home_team.status_title = getStatusTitle();
                            } else {
                                attrs.away_team.has_ball = true;
                                attrs.away_team.status_title = getStatusTitle();
                            }
                        }
                    }
                }

                // week inidcator
                if (attrs.season_week && attrs.season_part && attrs.season_part === "regular season") {
                    attrs.textPreDate = 'Wk ' + attrs.season_week;
                }

                return attrs;
            },

            getStatusTitle = function() {
                return '1'+(Math.floor(Math.random() * 3) + 1)+'.'+Math.floor(Math.random()*9)+'psi';
            }
    }

}(this));
