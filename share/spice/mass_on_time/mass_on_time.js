function ddg_spice_mass_on_time (api_result) {
    if (api_result.error) return;

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
    if (details.location.lat == 0 && details.location.lng == 0) return;

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

    if (results.length < 1) return;

    Spice.add({
        id: 'mass',
        data: results,
        name: "Parishes",
        meta: {
            itemType: generate_header(details),
            sourceName: "Mass On Time",
            sourceUrl: 'http://massontime.com/nearest/' + details.type +
                               "/25?lat=" + details.location.lat + "&lng=" + details.location.lng
        },
        normalize: function(item) {
            return {
                title: item.churchname,
                url: item.webaddress
            };
        },
        templates: {
            group: 'base',
            options: {
                content: pick_item_template(details)
            },
        detail: false
        }
    });
}

  /*
   ###  Handlebars Helpers ###
   */

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

Handlebars.registerHelper("MassOnTime_backup_link", function (webaddress, parish_id) {
    return "http://massontime.com/parish/" + parish_id;
});

Handlebars.registerHelper("MassOnTime_format_parish_address", function (address, city, province) {
    if (address && city && province) {
        return address + ", " + city + ", " + province;
    } else if (address && city) {
        return address + ", " + city;
    } else if (address) {
        return address;
    } else {
        return "";
    }
});

Handlebars.registerHelper( "MassOnTime_format_12h_start", function (utc_starttime) {
    if (utc_starttime) {
        var start = DDG.getDateFromString(utc_starttime);
        var meridian = 'am';
        var hours = start.getHours();
        if (hours >= 12) {
            meridian = 'pm'
            if (hours > 12) {
                hours = hours % 12;
            }
        }
        var minutes = start.getMinutes().toString();
        if (minutes.length === 1) {
            minutes = '0'+minutes;
        }
        return hours.toString()+':'+minutes+meridian;
    } else {
        return "";
    }
});
