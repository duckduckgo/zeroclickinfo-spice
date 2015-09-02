(function (env) {
    "use strict";
    
    var Games,
        OPS = {
            sequenceType: "inning",
            counter: "number",
            name: "innings",
            min: 9
        };

    env.ddg_spice_sports_mlb_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('mlb_games');
        }
        
        DDG.require('sports', function(){
            Games = env.ddg_spice_sports_games;
                
            Games.init(MLBInit);
        });
        
        var MLBInit = function () {
                Spice.add({
                    id: 'mlb_games',
                    name: 'MLB',

                    data: Games.transformGameData(apiResult.data),

                    from: apiResult.from,
                    signal: apiResult.signal,

                    meta: $.extend(Games.META, {
                        sourceUrl:  apiResult.url || "http://www.bleacherreport.com/mlb",
                        selectedItem: apiResult.data.most_relevant_game_id,
                    }),

                    templates: $.extend(Games.TEMPLATES, {
                        options: {
                            content: Spice.sports_mlb_games.mlb_score,
                            in_progress: Spice.sports_mlb_games.head_in_progress,
                            head_totals: Spice.sports_mlb_games.head_totals
                        }
                    }),
                    
                    normalize: MLBGameData
                });
            },
        
            MLBGameData = function(attrs) {
                attrs = Games.normalize(attrs, {
                    updatedTimeout: 15
                });
                
                // Game Finished/In-Progress
                if (attrs.has_started) {
                    var inning = attrs.score.away.innings.length-1 || -1,
                        placeholderStr = '&nbsp;';
                        
                    if (attrs.has_ended) {
                        placeholderStr = Games.PLACEHOLDER;
                        attrs.textGameOver = l("Game ended");
                    }
                    
                    // pitch_count contains the current game status
                    if (attrs.score.pitch_count) {
                        attrs.score.current = attrs.score.pitch_count.inning;

                        // always display placeholders up to 9 innings
                        attrs.score = Games.fillBoxscore(attrs.score, $.extend(OPS, {
                            obj: {
                                runs: ""
                            }
                        })); 

                        inning = attrs.score.pitch_count.inning-1;

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
    }

}(this));
