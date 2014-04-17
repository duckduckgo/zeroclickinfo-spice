function ddg_spice_earthquake(response) {
    "use strict";
	
    var results = [];
	
    for (var i = 0; i < response.features.length; i++) {
        results.push(response.features[i]);
    }

    if (!results.length) {
        return;
    }

    Spice.render({
        data             : results,
        header1          : 'Earthquakes',
        source_name      : 'USGS',
        source_url       : 'http://earthquake.usgs.gov/earthquakes/map/',
        spice_name       : 'earthquake',
        template_frame   : 'list',
        template_options : {
            items: results,
            show: 2,
            max: 10,
            template_item: 'earthquake'
        },
        force_big_header : true,
        force_space_after: true,
        force_no_fold    : true
    });
}

// Convert epoch time to a readable format
Handlebars.registerHelper('UTC', function (time) {
    "use strict";

    return new Date(time).toUTCString();
});
