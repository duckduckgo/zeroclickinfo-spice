function ddg_spice_guidebox_getid (api_result) {
    "use strict";

    if (!api_result.results) {
      return;
    }

    var SKIP_ARRAY = ["online","tv","episode","episodes","free","guidebox","watch","full"],
        results = api_result.results.result,
        relevant;

    // Check which show is relevant to our query.
    $.each(results, function(key, result) {
        if (DDG.isRelevant(result.title, SKIP_ARRAY, 3) && !relevant) {
            relevant = result;
        }
    });

    // Exit if we didn't find anything relevant.
    if (!relevant) {
	return;
    }

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    var script = $('[src*="/js/spice/guidebox/getid/"]')[0],
        source = decodeURIComponent($(script).attr("src")),
        matched = source.match(/\/js\/spice\/guidebox\/getid\/([a-zA-Z0-9\s]+)/),
        query  = matched[1];

    var metadata = {
        res_title : relevant.title,
        network   : relevant.network,
        more      : relevant.url,
        query     : query,
    };
    
    ddg_spice_guidebox_getid.metadata = metadata;
    $.getScript("/js/spice/guidebox/lastshows/series/" + relevant.id);
}

function ddg_spice_guidebox_lastshows (api_result) {
    "use strict";

    var metadata = ddg_spice_guidebox_getid.metadata;

    function toArray(obj) {
	var result = [];
	if($.isArray(obj)) {
	    return obj;
	} else {
	    $.each(obj, function(key, value) {
		result[key] = value;
	    });
	    return result;
	}
    }

    Spice.add({
        data                     : toArray(api_result.results.result),
        header1                  : metadata.res_title + " (TV  - " + metadata.network + ")",
        sourceName              : "Guidebox",
        sourceUrl               : metadata.more,
        view: "Tiles",
        id               : "guidebox",
        templates         : { 
            items                : api_result.results.result,
            item: Spice.guidebox_getid.guidebox_getid,
            detail: Spice.guidebox_getid.guidebox_getid_details,
            li_width             : 120,
            li_height            : 105
        }
    });
};

Handlebars.registerHelper("checkSeason", function(season_number, episode_number, options) {
    "use strict";

    if(season_number !== "0") {
	return options.fn({
	    season_number: season_number, 
	    episode_number: episode_number
	});
    }
});

Handlebars.registerHelper("getQuery", function() {
    "use strict";

    return ddg_spice_guidebox_getid.metadata.query;
});

Handlebars.registerHelper("getTitle", function() {
    "use strict";

    return ddg_spice_guidebox_getid.metadata.res_title;
});

Handlebars.registerHelper("getDate", function(first_aired) {
    "use strict";

    var aired = DDG.getDateFromString(first_aired),
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        months = [ 'January','February','March','April','May','June','July','August','September','October','November','December'];

    return days[aired.getDay()] + ", " + months[aired.getMonth()] + " " + aired.getDate() + ", " + aired.getFullYear()
});

Handlebars.registerHelper("pluralize", function(string, options) { 
    "use strict";
    
    if (options.hash && options.hash.singular && options.hash.plural){
        var arr = string.split("|");
        return arr.length > 1 ? options.hash.plural : options.hash.singular
    }
    return "";
});

Handlebars.registerHelper("split", function(string) { 
    "use strict";
    
    return string.replace(/^\||\|$/g, "").replace(/\|/g, ", ");
});

Handlebars.registerHelper("creators", function(options) {
    "use strict";
    
    if (this.writers.length || this.directors.length){
        return options.fn(this)
    }
    return "";
});

Handlebars.registerHelper("get_network", function(options) {  
    "use strict";

    return ddg_spice_guidebox_getid.metadata.network;
});
