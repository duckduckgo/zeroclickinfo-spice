function ddg_spice_mass_on_time(api_result) {
    if (api_result.error) {
        return;
    }
    var details = api_result["query-details"];
    // Check the URL if we passed in the "current" word.
    // This says if we should check for relevancy or not.
    var script = $('[src*="/js/spice/mass_on_time/"]')[0];
    var source = $(script).attr("src");
    var generate_header = function(query_details) {
        var type;
        //Convert the query type to plural and capitalize
        if ("mass" == query_details.type) {
            type = "Masses";
        } else {
            if ("parish" == query_details.type) {
                type = "Parishes";
            } else {
                if ("any" == query_details.type) {
                    type = "Services";
                } else {
                    type = query_details.type.charAt(0).toUpperCase() + query_details.type.slice(1) + "s";
                }
            }
        }
        return type;
    };
    //Parishes return different info than events, so a different template is in order for those
    var pick_item_template = function(query_details) {
        if ("parish" == query_details.type) {
            return Spice.mass_on_time.parish;
        } else {
            return Spice.mass_on_time.events;
        }
    };
    //Return if service couldn't find the address given
    if (0 == details.location.lat && 0 == details.location.lng) {
        return;
    }
    //Filter results with no address
    var results = [];
    for (var i = api_result.results.length - 1; i >= 0; i--) {
        var result = api_result.results[i];
        // Check if it's the current location. If it is, don't check the relevancy.
        if (null !== result.address && "" !== result.address && (/current$/.test(source) || DDG.stringsRelevant(details.address, result.formateaddress))) {
            results.unshift(result);
        }
    }
    if (results.length < 1) {
        return;
    }
    Spice.render({
        id: "mass",
        data: results,
        name: "Parishes",
        meta: {
            itemType: generate_header(details),
            sourceName: "Mass On Time",
            sourceUrl: "http://massontime.com/nearest/" + details.type + "/25?lat=" + details.location.lat + "&lng=" + details.location.lng
        },
        normalize: function(item) {
            return {
                title: item.churchname,
                url: item.webaddress
            };
        },
        templates: {
            group: "base",
            options: {
                content: pick_item_template(details)
            },
            detail: !1
        }
    });
}

/*
   ###  Handlebars Helpers ###
   */
//Event types are returns as integers. This converts them to their string reps.
Handlebars.registerHelper("MassOnTime_format_eventtypeid", function(eventtypeid) {
    var event_type_name = {
        1: "Adoration",
        2: "Confession",
        3: "Devotion",
        5: "Holy Day Mass",
        6: "Holy Day Mass (Vigil)",
        7: "Weekday Mass",
        8: "Weekend Mass"
    };
    return event_type_name[eventtypeid] || "Service";
}), Handlebars.registerHelper("MassOnTime_backup_link", function(webaddress, parish_id) {
    return "http://massontime.com/parish/" + parish_id;
}), Handlebars.registerHelper("MassOnTime_format_parish_address", function(address, city, province) {
    if (address && city && province) {
        return address + ", " + city + ", " + province;
    } else {
        if (address && city) {
            return address + ", " + city;
        } else {
            if (address) {
                return address;
            } else {
                return "";
            }
        }
    }
});