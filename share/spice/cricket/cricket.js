(function (env) {
    "use strict";
    var SCORECARD_ENDPOINT = '/js/spice/scorecard/',
        LIVE_SCORECARD_ENDPOINT = '/js/spice/live/';
    env.ddg_spice_cricket = function (api_result) {

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
                    primaryText: "<span style='color: deepskyblue;'>" + data.SeriesName + ", Schedule & Score</span>",
                    idField: "matchid",
                    selectedItem: getSelected(data.Schedule.Match),
                    scrollToSelectedItem: true,
                    itemsHighlight: true,
                    itemsExpand: true,
                    //secondaryText: '<span class="tx-clr--grey-dark">YQL</span>',
                    rerender: ["teams.0", "teams.1"],//TODO: need a better way
                    sourceName: "Yahoo",
                    sourceUrl: "https://cricket.yahoo.com/"
                },
                normalize: function (item) {
                    var teams = getTeams(item);
                    var m_date = moment.utc(item.StartDate).local();
                    var date = m_date.format('ddd, Do MMM'),
                        relativeTime = m_date.calendar(),
                        startTime = m_date.format('LT'),
                        startDate = Date.parse(m_date.format("YYYY-MM-DD"));
                    return {
                        matchid: item.matchid,
                        mtype: item.mtype.toUpperCase(),
                        matchNo: item.MatchNo,
                        venue: item.Venue.content,
                        date: relativeTime.match(/Yesterday|Today|Tomorrow/g) ? relativeTime : date,
                        relativeTime: relativeTime,
                        startTime: startTime,
                        startDate: startDate,
                        matchTimeSpan: item.MatchTimeSpan,
                        teams: teams,
                        result: item.Result,
                        winner: teams,
                        winnersn: teams && teams.name && teams.name.split(" ").length > 1 ? teams.name.match(/\b(\w)/g).join('') : teams.name,
                        winnerln: teams,
                        hasEnded: item.status === "post" || relativeTime.match(/Today/g) ? true : false
                    };
                },
                templates: {
                    item: "base_expanding_item",
                    elClass: {
                        tileExpand: "zci--cricket-footer"
                    },
                    options: {
                        content: Spice.cricket.content,
                        moreAt: true
                    }
                },
                onItemShown: function (item) {
                    item.teams.map(function (team, i) {
                        $.ajax({
                            url: DDG.get_asset_path('cricket', "assets/" + team.teamid + ".svg"),
                            type: 'get',
                        }).always(function (data, statusText, xhr) {
                            // Check if team logo exists
                            if (xhr.status === 200) {
                                team.logo = DDG.get_asset_path('cricket', "assets/" + team.teamid + ".svg");
                                //TODO: need a better way
                                item.set("teams." + i, item.teams);
                            } else {
                                team.logo = DDG.get_asset_path('cricket', "assets/" + team.teamid + ".png");
                                //TODO: need a better way
                                item.set("teams." + i, item.teams);
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

        //TODO: update winner, rename function
        function getTeams(match) {
            if (match.Result) {
                var winner = match.Result.Team.filter(function (team) {
                    return team.matchwon === "yes";
                });
                if (winner.length) {
                    return match.Team.map(function (team) {
                        if (team.teamid === winner[0].id) {
                            team.winner = "winner";
                        }
                        return team;
                    });
                }
            }
            return match.Team;
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
                            $('#' + data.query.results.Scorecard.mid + ' .score-' + teamid).html(run + "/" + wicket + " (" + over + ")");
                            if (data.query.results.Scorecard.ms) {
                                $('#' + data.query.results.Scorecard.mid + ' .live-status-' + data.query.results.Scorecard.mid).html('<span style="color: #3d9400 !important;">' + data.query.results.Scorecard.ms + '</span>');
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
            return $.getJSON(SCORECARD_ENDPOINT + matchid).always(function (data, statusText, xhr) {
                if (data.query && data.query.results && data.query.results.Scorecard && data.query.results.Scorecard.past_ings) {
                    var results = data.query.results.Scorecard.past_ings.constructor === Array ? data.query.results.Scorecard.past_ings : [data.query.results.Scorecard.past_ings];
                    results.map(function (inning) {
                        var run = inning.s.a.r,
                            over = inning.s.a.o,
                            runrate = inning.s.a.rr,
                            wicket = inning.s.a.w,
                            teamid = inning.s.a.i;
                        $('#' + data.query.results.Scorecard.mid + ' .score-' + teamid).html(run + "/" + wicket + " (" + over + ")");
                        if (data.query.results.Scorecard.ms === "Play in Progress") {
                            $('#' + data.query.results.Scorecard.mid + ' .live-status-' + data.query.results.Scorecard.mid).html('<span style="color: #3d9400 !important;">live</span>');
                        }
                    });
                }
            });
        }
    };
}(this));
