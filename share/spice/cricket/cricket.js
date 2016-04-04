(function(env) {
  "use strict";
  env.ddg_spice_cricket = function(api_result) {

    // Validate the response (customize for your Spice)
    if (!api_result || api_result.error) {
      return Spice.failed('cricket');
    }
    DDG.require("moment.js", function() {
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
        normalize: function(item) {
          var response = api_result.query.results.Series[0];
          var data = {
            // customize as needed for your chosen template
            name: response.SeriesName,
            description: "Score & Schedule",
            image: item.icon,
            matches: []
          };
          for (var i in response.Schedule.Match) {
            var match = response.Schedule.Match[i];
            var matchDetails = {
              mtype: match.mtype,
              matchNo: match.MatchNo,
              Venue: match.Venue,
              startDate: moment(match.StartDate).format('ddd, Do MMM'),
              endDate: moment(match.EndDate).format('LLL'),
              matchTimeSpan: match.MatchTimeSpan,
              team: match.Team
            };
            data.matches.push(matchDetails);
          }
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
  };
}(this));
