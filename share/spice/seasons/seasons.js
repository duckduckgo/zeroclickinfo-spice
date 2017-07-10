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
        var query = source.match(/seasons\/[0-9]{4}\/[a-zA-Z]{2}\/([a-z]+)\/([a-z]+)/);

        var season_q = query[1];
        var hemisphere_q = query[2];

        var seasons = [ "spring", "summer", "autumn", "winter" ];
        if (hemisphere_q == 'south') {
          seasons = [ "autumn", "winter", "spring", "summer" ];
        }

        var season = $.inArray(season_q, seasons);

        // Somehow we got an unknown season, bail out
        if (season < 0) {
            return Spice.failed('seasons');
        }

        // Grab the correct season from api results and generate output data
        var event = api_result.holidays[season];
        var date = DDG.getDateFromString(event.date.iso);

        var result = {
          date: date,
          location: event.country.name,
          season: DDG.capitalize(season_q)
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
                        title: moment(result.date).format("dddd, MMMM Do"),
                        subtitle: result.location + " – First day of " + result.season + " in " + result.date.getFullYear()
                    };
                }
            });
        });
    };
}(this));
