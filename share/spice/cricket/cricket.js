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
                            mtype: match.mtype.toUpperCase(),
                            matchNo: match.MatchNo,
                            Venue: match.Venue,
                            date: moment(match.StartDate).format('ddd, Do MMM'),
                            startTime: moment(match.StartDate).format('LT'),
                            matchTimeSpan: match.MatchTimeSpan,
                            teams: match.Team
                        };
                        if (!matches[moment(match.StartDate).format('LL')]) {
                            matches[moment(match.StartDate).format('LL')]=[]
                        }
                        matches[moment(match.StartDate).format('LL')].push(matchDetails);
                    }
                    var matchList=[];
                    for(var date in matches){
                        matchList.push(matches[date]);
                    }
                    matchList.sort(function (a,b) {
                        return a-b;
                    });
                    data.matches=matchList;
                    return data;
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
        Handlebars.registerHelper('fullName', function (person) {
            //alert();
            //return person.firstName + " " + highlightJavascript(person);
        });
    };
}(this));
