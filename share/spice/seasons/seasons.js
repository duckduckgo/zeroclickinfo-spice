(function (env) {
    "use strict";
    env.ddg_spice_seasons = function(api_result){

        // Make sure we have a result
        if (!(api_result &&
                api_result.holidays &&
                api_result.holidays.length == 4)) {
            return Spice.failed('seasons');
        }

        // Grab the matching search terms and figure out the season
        var script = $('[src*="/js/spice/seasons/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/seasons\/[0-9]{4}\/[a-zA-Z]{2}\/([a-z]+)/)[1];
        var season = $.inArray(query, [ "spring", "summer", "autumn", "winter" ]);

        // Somehow we got an unknown season, bail out
        if (season < 0) {
            return Spice.failed('seasons');
        }

        // Grab the correct season from api results and generate output data
        var event = api_result.holidays[season];
        var date = DDG.getDateFromString(event.date.iso);

        var result = {
          event: DDG.capitalize(event.name.toLowerCase()),
          date: date,
          location: event.country.name,
          season: query
        };

        DDG.require("moment.js", function() {
            Spice.add({
                id: "seasons",
                name: "Seasons",
                data: result,
                meta: {
                    sourceName: "timeanddate.com",
                    sourceUrl: event.url
                },

                templates: {
                    group: 'text',
                    options: {
                        moreAt: true
                    }
                },

                normalize: function(item){
                    return {
                        title: moment(result.date).format("dddd, MMMM Do, YYYY"),
                        subtitle: result.date.getFullYear() + " first day of " + result.season + " (" + result.event + ") in " + result.location
                    };
                }
            });
        });
    };
}(this));
