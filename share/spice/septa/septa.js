function ddg_spice_septa(api_result) {
    "use strict";

    if (api_result.length < 1 ||
            !api_result[0].orig_line ||
            !api_result[0].orig_departure_time ||
            !api_result[0].orig_delay) {
        return Spice.failed('septa');
    }

    var script  = $("[src*='js/spice/septa/']")[0];
    var source  = unescape($(script).attr("src"));
    var parts   = source.split('/');
    var from    = parts[4];
    var to      = parts[5];

    Spice.add({
	id: 'septa',
	name: 'Trains',
        data: api_result,
	meta: {
            sourceName: 'SEPTA',
            sourceUrl: 'http://www.septa.org/schedules/rail/index.html',
	    sourceIconUrl: 'http://septa.org/site/images/favicon.ico',
	    itemType: 'trains'
	},
	normalize: function(item) {
	    return {
		url: 'http://www.septa.org/schedules/rail/index.html'
	    };
	},
        templates: {
	    group: 'base',
	    detail: false,
	    item_detail: false,
	    options: {
		content: Spice.septa.content
	    }
        }
    });
};

Handlebars.registerHelper ('SEPTA_delay', function(delay) {
    "use strict";

    if (delay == "On time") {
        return "On time";
    }
    if (delay == "Suspended") {
        return "Suspended";
    }
    var parts = delay.split(" ");
    var delay = parts[0] + " minute" + (parts[0] > 1 ? "s" : "") + " late";
    return delay;
});
