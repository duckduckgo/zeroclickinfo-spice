function ddg_spice_mass_on_time (api_result) {
    if (api_result.error) return;

    var generate_header = function (query_details) {
	type = "";
	//Convert the query type to plural and capitalize
	if (query_details.type == "mass")
	{ type = "Masses"; }
	else if (query_details.type == "parish")
	{ type = "Parishes"; }
	else
	{ type = query_details.type.charAt(0).toUpperCase() + query_details.type.slice(1) + "s"; }

	//Add the location string
	return type + " near " + query_details.location;
    };

    //Parishes return different info than events, so a different template is in order for those
    var pick_item_template = function (query_details) {
	if (query_details.type == "parish")
	{ return "mass_on_time_church"; }
	else
	{ return "mass_on_time"; }
    };

    Spice.render({
	data              : api_result,
	header1           : generate_header(api_result['query-details']),
	source_name       : "Mass On Time",
	spice_name        : 'mass_on_time',
	source_url        : 'http://massontime.com/nearest/' + api_result['query-details'].type + "/25",
	template_frame   : 'list',
	template_options : {
            items: api_result.results,
            show: 5,
            template_item: pick_item_template(api_result['query-details'])
	},
	force_no_fold     : true,
	force_big_header  : true,
	force_favicon_url : 'http://massontime.com/favicon.ico'
    });
    
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
	};
    });
}
