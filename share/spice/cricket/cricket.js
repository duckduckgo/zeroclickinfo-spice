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
                    selectedItem: "193870",
                    scrollToSelectedItem: true,
                    itemType: l("Games"),
                    itemsHighlight: false,
                    itemsExpand: true,
                    secondaryText: '<span class="tx-clr--grey-dark">YQL</span>',
                    sourceName: "developer.yahoo.com",
                    sourceUrl: 'http://example.com/url/to/details/' + api_result.name
                },
                normalize: function (item) {
                    //var response = api_result.query.results.Series[0];
                    //var data = {
                    //    // customize as needed for your chosen template
                    //    name: response.SeriesName,
                    //    description: "Score & Schedule",
                    //    image: item.icon,
                    //    matches: []
                    //};
                    //var matches = {};
                    //for (var i = 0; i < response.Schedule.Match.length; i++) {
                    //    var match = response.Schedule.Match[i];
                    //    var matchDetails = {
                    //        matchid: match.matchid,
                    //        mtype: match.mtype.toUpperCase(),
                    //        matchNo: match.MatchNo,
                    //        Venue: match.Venue,
                    //        date: moment(match.StartDate).format('ddd, Do MMM'),
                    //        startTime: moment(match.StartDate).format('LT'),
                    //        startDate: Date.parse(moment(match.StartDate).format("YYYY-MM-DD")),
                    //        matchTimeSpan: match.MatchTimeSpan,
                    //        teams: match.Team
                    //    };
                    //    if (!matches[moment(match.StartDate).format('LL')]) {
                    //        matches[moment(match.StartDate).format('LL')] = []
                    //    }
                    //    matches[moment(match.StartDate).format('LL')].push(matchDetails);
                    //}
                    //var matchList = [];
                    //for (var date in matches) {
                    //    matchList.push(matches[date]);
                    //}
                    //matchList.sort(function (a, b) {
                    //    return a[0].startDate - b[0].startDate;
                    //});
                    //data.matches = matchList;
                    //return setDefault(data);
                    return {
                        matchid: item.matchid,
                        mtype: item.mtype.toUpperCase(),
                        matchNo: item.MatchNo,
                        Venue: item.Venue,
                        date: moment(item.StartDate).format('ddd, Do MMM'),
                        startTime: moment(item.StartDate).format('LT'),
                        startDate: Date.parse(moment(item.StartDate).format("YYYY-MM-DD")),
                        matchTimeSpan: item.MatchTimeSpan,
                        teams: item.Team,
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
