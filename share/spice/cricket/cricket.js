(function (env) {
    "use strict";
    var SCORECARD_ENDPOINT = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.scorecard%20where%20match_id%3D{$1}&format=json&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0&callback=',
        LIVE_SCORECARD_ENDPOINT = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.scorecard.live&format=json&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0&callback=';
    env.ddg_spice_cricket = function (api_result) {
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.query.results) {
            return Spice.failed('cricket');
        }
        //TODO:select latest series
        var data = api_result.query.results.Series.constructor === Array ? api_result.query.results.Series[0] : api_result.query.results.Series;
        DDG.require("moment.js", function () {
            // Render the response
            Spice.add({
                id: "cricket",
                name: "Cricket",
                data: data.Schedule.Match,
                meta: {
                    //TODO: update display
                    primaryText: "<span style='color:deepskyblue;'>" + data.SeriesName + ", Schedule & Score</span>",
                    idField: "matchid",
                    selectedItem: getSelected(data.Schedule.Match),
                    scrollToSelectedItem: true,
                    itemsHighlight: true,
                    itemsExpand: true,
                    //secondaryText: '<span class="tx-clr--grey-dark">YQL</span>',
                    rerender: ["teams.0", "teams.1"],//TODO: need a better way
                    //sourceName: "developer.yahoo.com",
                    //sourceUrl: 'http://example.com/url/to/details/' + api_result.name
                },
                normalize: function (item) {
                    var winner = getWinner(item);
                    return {
                        matchid: item.matchid,
                        mtype: item.mtype.toUpperCase(),
                        matchNo: item.MatchNo,
                        venue: item.Venue.content,
                        date: moment.utc(item.StartDate).local().format('ddd, Do MMM'),
                        relativeTime: moment.utc(item.StartDate).local().calendar(),
                        startTime: moment.utc(item.StartDate).local().format('LT'),
                        startDate: Date.parse(moment.utc(item.StartDate).local().format("YYYY-MM-DD")),
                        matchTimeSpan: item.MatchTimeSpan,
                        teams: item.Team,
                        result: item.Result,
                        winnersn: winner && winner.split(" ").length > 1 ? winner.match(/\b(\w)/g).join('') : winner,
                        winnerln: winner,
                    };
                },
                templates: {
                    item: "base_expanding_item",
                    elClass: {
                        tileExpand: "zci-cricket-footer"
                    },
                    options: {
                        content: Spice.cricket.content,
                        moreAt: false
                    }
                },
                onItemShown: function (item) {
                    item.teams.map(function (team, i) {
                        $.ajax({
                            url: DDG.get_asset_path('cricket', "assets/" + team.teamid + ".png"),
                            type: 'get',
                        }).always(function (data, statusText, xhr) {
                            // Check if team logo exists
                            if (xhr.status === 200 && xhr.getResponseHeader('content-type') == "image/png") {
                                team.logo = DDG.get_asset_path('cricket', "assets/" + team.teamid + ".png");
                                //TODO: need a better way
                                item.set("teams." + i, item.teams);
                            } else {
                            }
                        });
                        return team;
                    });
                    fetchScore(item.matchid)
                }

            });
        });
        //TODO: return latest match id
        function getSelected(matches) {
            var today = new Date(new Date().toUTCString());
            var diff = Math.abs(new Date(new Date(matches[0].StartDate).toUTCString()) - today);
            var index = 0;
            for (var i = 1; i < matches.length; i++) {
                if (diff > Math.abs(new Date(new Date(matches[i].StartDate).toUTCString()) - today)) {
                    diff = Math.abs(new Date(new Date(matches[i].StartDate).toUTCString()) - today);
                    index = i;
                }
            }
            fetchLiveScore(0);
            return matches[index].matchid;
        }

        //TODO: return result
        function getWinner(match) {
            if (match.Result) {
                var winner = match.Result.Team.filter(function (team) {
                    return team.matchwon === "yes";
                });
                if (winner.length) {
                    return match.Team.filter(function (team) {
                        return team.teamid === winner[0].id;
                    })[0].Team;
                }
            }
            return "";
        }

        function fetchLiveScore(time) {
            return setTimeout(function () {
                return $.getJSON(LIVE_SCORECARD_ENDPOINT).always(function (data, statusText, xhr) {
                    if (data.query && data.query.results && data.query.results.Scorecard && data.query.results.Scorecard.past_ings) {
                        var results = data.query.results.Scorecard.past_ings.constructor === Array ? data.query.results.Scorecard.past_ings : [data.query.results.Scorecard.past_ings];
                        results.map(function (inning) {
                            var run = inning.s.a.r,
                                over = inning.s.a.o,
                                runrate = inning.s.a.rr,
                                wicket = inning.s.a.w,
                                teamid = inning.s.a.i;
                            $('.score-' + teamid).html(run + "/" + wicket + " (" + over + ")");
                            if (data.query.results.Scorecard.ms) {
                                $('.live-status-' + data.query.results.Scorecard.mid).html('<span style="color: #3d9400 !important;">' + data.query.results.Scorecard.ms + '</span>');
                            }
                        });
                    }
                    if (xhr.status === 200 && data.query.results && data.query.results.Scorecard.ms !== "Match Ended") {
                        fetchLiveScore(5000);
                    }
                });

            }, time);
        }

        function fetchScore(matchid) {
            return $.getJSON(SCORECARD_ENDPOINT.replace("{$1}", matchid)).always(function (data, statusText, xhr) {
                if (data.query && data.query.results && data.query.results.Scorecard && data.query.results.past_ings) {
                    var results = data.query.results.past_ings.constructor === Array ? data.query.results.past_ings : [data.query.results.past_ings];
                    results.map(function (inning) {
                        var run = inning.s.a.r,
                            over = inning.s.a.o,
                            runrate = inning.s.a.rr,
                            wicket = inning.s.a.w,
                            teamid = inning.s.a.i;
                        $('.score-' + teamid).html(run + "/" + wicket + " (" + over + ")");
                        if (data.query.results.Scorecard.ms === "Play in Progress") {
                            $('.live-status-' + data.query.results.Scorecard.mid).html('<span style="color: #3d9400 !important;">live</span>');
                        }
                    });
                    if (xhr.status === 200 && results.Scorecard.ms !== "Match Ended") {
                        fetchLiveScore(5000);
                    }
                }
            });
        }
    };
    env.show = function (id) {
        $("#" + id + " .zci-cricket-match").toggleClass("zci-cricket-inactive");
        $("#" + id + ".show").toggleClass("zci-cricket-inactive");
        $("#" + id + ".hide").toggleClass("zci-cricket-inactive");
    };
}(this));
