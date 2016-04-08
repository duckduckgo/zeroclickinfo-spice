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
                    selectedItem: getSelected(data),
                    scrollToSelectedItem: true,
                    itemType: l("Games"),
                    itemsHighlight: false,
                    itemsExpand: true,
                    secondaryText: '<span class="tx-clr--grey-dark">YQL</span>',
                    sourceName: "developer.yahoo.com",
                    sourceUrl: 'http://example.com/url/to/details/' + api_result.name
                },
                normalize: function (item) {
                    return {
                        matchid: item.matchid,
                        mtype: item.mtype.toUpperCase(),
                        matchNo: item.MatchNo,
                        venue: item.Venue.content,
                        date: moment(item.StartDate).format('ddd, Do MMM'),
                        relativeTime: moment(item.StartDate).calendar(),
                        startTime: moment(item.StartDate).format('LT'),
                        startDate: Date.parse(moment(item.StartDate).format("YYYY-MM-DD")),
                        matchTimeSpan: item.MatchTimeSpan,
                        teams: item.Team,
                        result:item.Result,
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
        //TODO: return latest match id
        function getSelected(data) {
            return 193870;
        }

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
        var listEls = document.getElementById(id + "").classList.toggle("zci-cricket-inactive");
    };
}(this));
