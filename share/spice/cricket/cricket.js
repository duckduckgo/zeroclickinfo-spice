(function (env) {
    "use strict";
    env.ddg_spice_cricket = function (api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('cricket');
        }
        DDG.require("moment.js", function () {
            // Render the response
            Spice.add({
                id: "cricket",

                // Customize these properties
                name: "Cricket",
                data: api_result.query.results.Series[0].SeriesName,
                meta: {
                    sourceName: "developer.yahoo.com",
                    sourceUrl: 'http://example.com/url/to/details/' + api_result.name
                },
                normalize: function (item) {
                    var response = api_result.query.results.Series[0];
                    var data = {
                        // customize as needed for your chosen template
                        name: response.SeriesName,
                        description: "Score & Schedule",
                        image: item.icon,
                        matches: []
                    };
                    var matches = {};
                    for (var i = 0; i < response.Schedule.Match.length; i++) {
                        var match = response.Schedule.Match[i];
                        var matchDetails = {
                            matchid: match.matchid,
                            mtype: match.mtype.toUpperCase(),
                            matchNo: match.MatchNo,
                            Venue: match.Venue,
                            date: moment(match.StartDate).format('ddd, Do MMM'),
                            startTime: moment(match.StartDate).format('LT'),
                            startDate: Date.parse(moment(match.StartDate).format("YYYY-MM-DD")),
                            matchTimeSpan: match.MatchTimeSpan,
                            teams: match.Team
                        };
                        if (!matches[moment(match.StartDate).format('LL')]) {
                            matches[moment(match.StartDate).format('LL')] = []
                        }
                        matches[moment(match.StartDate).format('LL')].push(matchDetails);
                    }
                    var matchList = [];
                    for (var date in matches) {
                        matchList.push(matches[date]);
                    }
                    matchList.sort(function (a, b) {
                        return a[0].startDate - b[0].startDate;
                    });
                    data.matches = matchList;
                    return setDefault(data);
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.cricket.content,
                        moreAt: true
                    }
                }
            });
        });
        function setDefault(data) {
            var today = Date.parse(new Date());
            var diff = Math.abs(data.matches[0][0].startDate - today);
            var index = 0;
            for (var i = 1; i < data.matches.length; i++) {
                if (diff > Math.abs(data.matches[i][0].startDate - today)) {
                    index = i;
                }
            }
            //TODO: check for proper active class addition
            data.matches[index][0].active="active";
            return data;
        }
    };
    env.show = function (id) {
        console.log(id);
        var contentEls = document.getElementsByClassName('zci-cricket-content');
        for (var i = 0; i < contentEls.length; i++) {
            //contentEls[i].classList.remove("zci-cricket-active");
            contentEls[i].classList.add("zci-cricket-inactive");
            if (contentEls[i].classList.contains(id)) {
                contentEls[i].classList.remove("zci-cricket-inactive");
            }
        }
        var listEls = document.querySelectorAll('.zci-cricket-list li');

        for (var i = 0; i < listEls.length; i++) {
            listEls[i].classList.remove("active");
        }
        document.getElementById(id).classList.add('active');
    };
}(this));
