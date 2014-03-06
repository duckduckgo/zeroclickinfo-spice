function ddg_spice_mass_on_time (api_result) {
    if (api_result.error) return;

    var details = api_result['query-details'];

    var generate_header = function (query_details) {
	var type = "";
	//Convert the query type to plural and capitalize
	if (query_details.type == "mass") {
	  type = "Masses";
	} else if (query_details.type == "parish") {
	  type = "Parishes";
	} else {
	  type = query_details.type.charAt(0).toUpperCase() + query_details.type.slice(1) + "s";
	}

	//Add the location string
	return type + " near " + query_details.address;
    };

    //Parishes return different info than events, so a different template is in order for those
    var pick_item_template = function (query_details) {
	if (query_details.type == "parish") {
	  return "mass_on_time_church";
	} else {
	  return "mass_on_time";
	}
    };

    //Return if service couldn't find the address given
    if (details.location.lat == 0 && details.location.lng == 0) return;

    //Filter results with no address
    var results = [];
    for(var i=api_result.results.length-1; i>=0; i--) {
      var result=api_result.results[i];
      if (result.address != null && result.address !== "") {
	results.unshift(result);
      }
    }

    if (results.length < 1) return;

    Spice.render({
	data              : api_result,
	header1           : generate_header(details),
	source_name       : "Mass On Time",
	spice_name        : 'mass_on_time',
	source_url        : 'http://massontime.com/nearest/' + details.type +
	  "/25?lat=" + details.location.lat + "&lng=" + details.location.lng,
	template_frame   : 'list',
	template_options : {
            items: results,
            show: 3,
            max:  10,
            template_item: pick_item_template(details)
	},
	force_no_fold     : true,
	force_big_header  : true,
	force_favicon_url : 'http://massontime.com/favicon.ico'
    });
}

  /*
   ###  Handlebars Helpers ###
   */

//Event types are returns as integers. This converts them to their string reps.
Handlebars.registerHelper( "format_eventtypeid", function (eventtypeid) {
	switch (eventtypeid) {
	case 1:
	    return "Adoration";
	case 2:
	    return "Confession";
	case 3:
	    return "Devotion";
	case 5:
	    return "Holy Day Mass";
	case 6:
	    return "Holy Day Mass (Vigil)";
	case 7:
	    return "Weekday Mass";
	case 8:
	    return "Weekend Mass";
	default:
	    return "Service";
	};
});

Handlebars.registerHelper( "backup_link", function (webaddress, parish_id) {
        return "http://massontime.com/parish/" + parish_id;
});

Handlebars.registerHelper( "format_parish_address", function (address, city, province) {
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
