(function(env){
    "use strict";

    function backup_link (parish_id) {
        return "http://massontime.com/parish/" + parish_id;
    }

    function parish_address (address, city, province) {
        if (address && city && province) {
            return address + ", " + city + ", " + province;
        } else if (address && city) {
            return address + ", " + city;
        } else if (address) {
            return address;
        } else {
            return "";
        }
    }

    //Event types are returns as integers. This converts them to their string reps.
    Handlebars.registerHelper("MassOnTime_format_eventtypeid", function (eventtypeid) {
        var event_type_name = {
            1 : "Adoration",
            2 : "Confession",
            3 : "Devotion",
            5 : "Holy Day Mass",
            6 : "Holy Day Mass (Vigil)",
            7 : "Weekday Mass",
            8 : "Weekend Mass"
        };
        return event_type_name[eventtypeid] || "Service";
    });

    env.ddg_spice_mass_on_time = function (api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed('mass_on_time');
        }

        var details = api_result['query-details'];

        // Check the URL if we passed in the "current" word.
        // This says if we should check for relevancy or not.
        var script = $('[src*="/js/spice/mass_on_time/"]')[0];
        var source = $(script).attr("src");

        var generate_header = function (query_details) {
            var type;

            //Convert the query type to plural and capitalize
            if (query_details.type == "mass") {
                type = "Masses";
            } else if (query_details.type == "parish") {
                type = "Parishes";
            } else if (query_details.type == "any") {
                type = "Services";
            } else {
                type = query_details.type.charAt(0).toUpperCase() + query_details.type.slice(1) + "s";
            }

            return type;
        };

        //Parishes return different info than events, so a different template is in order for those
        var pick_item_template = function (query_details) {
            if (query_details.type == "parish") {
                return Spice.mass_on_time.parish;
            } else {
                return Spice.mass_on_time.events;
            }
        };

        //Return if service couldn't find the address given
        if (details.location.lat === 0 && details.location.lng === 0) {
            return Spice.failed('mass_on_time');
        }

        //Filter results with no address
        var results = [];
        for(var i = api_result.results.length - 1; i >= 0; i--) {
            var result = api_result.results[i];

            // Check if it's the current location. If it is, don't check the relevancy.
            if (result.address !== null && result.address !== "" &&
                (/current$/.test(source) || DDG.stringsRelevant(details.address, result.city))) {
                results.unshift(result);
            }
        }

        if (results.length < 1) {
            return Spice.failed('mass_on_time');
        }

        DDG.require(['maps', 'moment.js'], function() {
            Spice.add({
                id: 'mass_on_time',
                data: results,
                name: 'Parishes',
                model: 'Place',
                view: 'Places',
                meta: {
                    primaryText: 'Showing ' + results.length + ' ' + generate_header(details),
                    sourceName: "Mass On Time",
                    sourceUrl: 'http://massontime.com/nearest/' + details.type +
                        "/25?lat=" +details.location.lat +
                        "&lng=" + details.location.lng
                },
                normalize: function(item) {
                    return {
                        id: item.church_id,
                        name: item.churchname,
                        url: item.webaddress ? item.webaddress : backup_link(item.church_id),
                        lon: item.lng,
                        lat: item.lat,
                        city: item.diocesename ? item.diocesename : item.city,
                        address: parish_address(item.address, item.city, item.province),
                        startTime: moment(item.starttime).format("h:mmA")
                    };
                },
                templates: {
                    group: 'places',
                    item: Spice.mass_on_time.item
                }
            });
        });
    };
}(this));
