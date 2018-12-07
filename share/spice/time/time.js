(function(env) {
    "use strict";
    env.ddg_spice_time = function(api) {

        if (!api || api.info == "No matches") {
            return Spice.failed('time');
        }


        var script = $('[src*="/js/spice/time/"]')[0],
            source = $(script).attr("src"),
            // Query is normalized as we'll normalize the generated strings.
            // if we have a comma separated query it is in the form:
            // "town, state, country"  but state is optional
            query = decodeURIComponentSafe(source.match(/time\/([^\/]+)/)[1]).toLowerCase().split(','),
            isGeneric = /\/generic\//.test(source),
            callParameters = decodeURIComponentSafe(source).split('/'),
            chosen;

        // Generic queries are when the user is looking
        // for local time, but never specified a location
        // in the query string. Since the API doesn't
        // have full coverage, we use user TimeZone info
        // like America/New_York to get time for places
        // in the EST time zone. We then need to replace
        // New York (the looked up time), with the users
        // location.
        //
        // This information is passed through the DDH
        // system through the API call URL using / as a
        // delimeter.
        // A generic time request from Phoenixville, PA
        // looks like:
        //
        // /js/spice/time/America%20New%20York/generic/Phoenixville%2C%20Pennsylvania
        //
        // * We use America New York, to do a relevancy
        // check on the data we get back from the API.
        // * We use 'generic' as a means to know it's
        // a generic time query like 'current time'.
        // * We use Phoenixville, Pennsylvania, to make
        // sure we show the user the location they are in
        // That way people looking for the current time
        // in Phoenxivilla, PA see Phoenixville PA instead
        // of New York, NY.
        if (isGeneric && callParameters.length === 7) {
            var lookupLocation = callParameters[4],
            displayLocation = callParameters[6];

            if (api.locations.length && api.locations[0].geo) {
                if (lookupLocation.indexOf(api.locations[0].geo.name) > -1) {
                    chosen = api.locations[0];
                    chosen.overridePlaceName = displayLocation;
                }
            }
        } else {
            for(var i = 0; i < api.locations.length; i++) {
                // query[0] = state
                // query[len-1] = country
                if(DDG.stringsRelevant(query[0], api.locations[i].geo.name) &&
                   DDG.stringsRelevant(query[query.length-1], api.locations[i].geo.country.name)) {
                    chosen = api.locations[i];
                    break;
                }
            }
        }

        // If there isn't a place, return immediately.
        if(!chosen) {
            return Spice.failed('time');
        }
        
        DDG.require('moment.js', function(){
            var dateObj = moment.parseZone(chosen.time.iso, moment.ISO_8601);
            
            // holds display location
            var placeName = chosen.geo.state ? (chosen.geo.name + ", " + chosen.geo.state) : chosen.geo.name;
            if (chosen.overridePlaceName) {
                placeName = chosen.overridePlaceName;
            }

            var dateTime = {
                time: dateObj.format("h:mm A"),
                dayName: dateObj.format("dddd"),
                day: dateObj.format("D"),
                monthName: dateObj.format("MMMM"),
                year: dateObj.format("YYYY"),
                placeName: placeName,
                offset: chosen.time.timezone.offset,
                zone: chosen.time.timezone.zonename,
                country: chosen.geo.country.name
            };

            Spice.add({
                id: "time",
                name: "Time",
                data: dateTime,
                signal: 'high',
                meta: {
                    sourceName: "timeanddate.com",
                    sourceUrl: 'http://www.timeanddate.com/worldclock/city.html?n=' + chosen.id
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.time.content,
                        moreAt: true
                    }
                }
            });
        });
    };
}(this));
