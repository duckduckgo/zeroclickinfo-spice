(function (env) {
    "use strict";
    
    env.ddg_spice_sports_nfl_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('nfl_games');
        }
        
        DDG.require(['moment.js', 'sports'], function(){
            var games = env.ddg_spice_sports_games,
                data = games.transformGameData(apiResult.data);

            Spice.add({
                id: 'nfl_games',
                name: 'NFL',
                data: data,
                from: apiResult.from,
                signal: apiResult.signal,
                meta: $.extend(games.META, {
                    primaryText: 'Showing ' + data.length + ' Games',
                    sourceUrl:  apiResult.url || "http://www.bleacherreport.com/nfl",
                    selectedItem: apiResult.data.most_relevant_game_id,
                }),
                templates: $.extend(games.TEMPLATES, {
                    options: {
                        content: Spice.sports_nfl_games.nfl_score,
                        in_progress: Spice.sports_nfl_games.head_in_progress,
                        head_totals: Spice.sports_nfl_games.head_totals
                    }
                }),
                normalize: function(attrs) {
                    var ops = {
                        _checkClock: true,
                        _fixCount: true,
                        _setOT: true,
                        sequenceType: "quarter",
                        currentName: "quarter",
                        counter: "quarter",
                        name: "scoring",
                        half: 2,
                        min: 4,
                        obj: {
                            points: games.PLACEHOLDER
                        }
                    };

                    // default normalize first
                    attrs = games.normalize(attrs, ops);

                    // week inidcator
                    if (attrs.season_week && attrs.season_part && attrs.season_part === "regular season") {
                        attrs.textPreDate = 'Wk ' + attrs.season_week;
                    }

                    if (!attrs.has_started || attrs.has_ended) {
                        return attrs;
                    }

                    // Game Finished/In-Progress

                    // set the active quarter label (if necessary)
                    attrs.score.textCurrent = attrs.score.textCurrent || 'Q'+attrs.score[ops.counter];

                    // fill boxscore with placeholder data
                    attrs.score = games.fillBoxscore(attrs.score, ops);

                    // finish here if there is no possession data
                    if (!attrs.score || !attrs.score.possession) {
                        return attrs;
                    }

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

                    return attrs;
                }
            });
        });

        function getStatusTitle() {
            return '1'+(Math.floor(Math.random() * 3) + 1)+'.'+Math.floor(Math.random()*9)+'psi';
        }
    }

}(this));
