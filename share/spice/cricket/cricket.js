(function (env) {
    "use strict";
    env.ddg_spice_cricket = function (api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('cricket');
        }
        //TODO:select latest series
        var data = api_result.query.results.Series[0];
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
                    secondaryText: '<span class="tx-clr--grey-dark">YQL</span>',
                    rerender: ["teams.0", "teams.1"],//TODO: need a better way
                    //sourceName: "developer.yahoo.com",
                    //sourceUrl: 'http://example.com/url/to/details/' + api_result.name
                },
                normalize: function (item) {
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
                        winner: getWinner(item),
                    };
                },
                templates: {
                    item: "base_expanding_item",
                    elClass: {
                        tileExpand: "zci-cricket-footer"
                    },
                    options: {
                        content: Spice.cricket.content,
                        footer: Spice.cricket.content,
                        in_progress: Spice.cricket.content,
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
                    index = i;
                }
            }
            fetchScore(matches[index].matchid);
            return matches[index].matchid;
        }

        //TODO: return result
        function getWinner(match) {
            if (match.result) {
                var winner = match.Result.Team.filter(function (team) {
                    return team.matchwon === "yes";
                });
                if (winner.length) {
                    return match.Team.filter(function (team) {
                        return team.id === winner.id;
                    }).Team;
                }
            }
            return "Mumbai";
        }

        function fetchScore(matchid) {
            var interval = setInterval(function () {
                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.scorecard.live&format=json&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0&callback=',
                    type: 'get',
                }).always(function (data, statusText, xhr) {
                    console.log(data);
                    if (xhr.status === 200 && xhr.getResponseHeader('content-type') == "application/json; charset=UTF-8") {
                    } else {
                        clearInterval(interval);
                    }
                });
            }, 5000);
        }
    };
    env.show = function (id) {
        document.getElementById(id + "").classList.toggle("zci-cricket-inactive");
        document.getElementById("show").classList.toggle("zci-cricket-inactive");
        document.getElementById("hide").classList.toggle("zci-cricket-inactive");
    };
}(this));
