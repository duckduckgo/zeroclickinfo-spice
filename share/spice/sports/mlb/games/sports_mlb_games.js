(function (env) {
    "use strict";

    env.ddg_spice_sports_mlb_games = function(apiResult) {

        if (!apiResult || !apiResult.data || !apiResult.data.games || !apiResult.data.games.length) {
            return Spice.failed('mlb_games');
        }

        DDG.require(['moment.js', 'sports'], function() {
            var games = env.ddg_spice_sports_games,
                data = games.transformGameData(apiResult.data);

            Spice.add({
                id: 'mlb_games',
                name: 'MLB',
                data: games.transformGameData(apiResult.data),
                from: apiResult.from,
                signal: apiResult.signal,
                meta: $.extend(games.META, {
                    primaryText: 'Showing ' + data.length + ' Games',
                    sourceUrl:  apiResult.url || "http://www.bleacherreport.com/mlb",
                    selectedItem: apiResult.data.most_relevant_game_id,
                }),
                templates: $.extend(games.TEMPLATES, {
                    options: {
                        content: Spice.sports_mlb_games.mlb_score,
                        in_progress: Spice.sports_mlb_games.head_in_progress,
                        head_totals: Spice.sports_mlb_games.head_totals
                    }
                }),
                normalize: function(attrs) {
                    attrs = games.normalize(attrs, {
                        updatedTimeout: 15
                    });

                    if (!attrs.has_started) {
                        return attrs;
                    }

                    // Game Finished/In-Progress
                    var inning = attrs.score.away.innings.length-1 || -1,
                        placeholderStr = '&nbsp;';

                    if (attrs.has_ended) {
                        placeholderStr = games.PLACEHOLDER;
                        attrs.textGameOver = l("Game ended");
                    }

                    // pitch_count contains the current game status
                    if (attrs.score.pitch_count) {
                        attrs.score.current = attrs.score.pitch_count.inning;

                        // always display placeholders up to 9 innings
                        attrs.score = games.fillBoxscore(attrs.score, {
                            sequenceType: 'inning',
                            counter: 'number',
                            name: 'innings',
                            min: 9,
                            obj: {
                                runs: ''
                            }
                        });

                        inning = attrs.score.pitch_count.inning-1;

                        // mark current inning
                        if (attrs.score.pitch_count.inning_half === "B") {
                            attrs.score.home.innings[inning].current = true;
                            attrs.score.pitch_count.half_over = true;
                        } else {
                            attrs.score.away.innings[inning].current = true;
                        }
                    }

                    // Since the API no longer sends the same number of innings
                    // for both teams (with home team having smaller number of
                    // innings), this makes sure that the IA properly shows the
                    // innings of both teams
                    if (attrs.score.home.innings.length < attrs.score.away.innings.length) {
                        attrs.score.home.innings[inning] = {
                            runs: 'X',
                            sequence: inning + 1,
                            number: inning + 1,
                            type: 'inning'
                        }
                    }

                    if (inning > -1 && attrs.score.home.innings[inning].runs === 'X') {
                        // replace un-played inning 'X' with something more stylish
                        attrs.score.home.innings[inning].runs = placeholderStr;
                    }

                    return attrs;
                }
            });
        });
    }

}(this));
