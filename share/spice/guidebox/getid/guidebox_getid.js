function ddg_spice_guidebox_getid (api_result) {
    "use strict";

    if (!api_result.results) return;

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

    var metadata = ddg_spice_guidebox_getid.metadata;

    var a = {
        header1                  : metadata.res_title + " (TV  - " + metadata.network + ")",
        source_name              : "Guidebox",
        source_url               : metadata.more,
        template_frame           : "carousel",
        spice_name               : "guidebox",
        template_options         : { 
            items                : api_result.results.result,
            template_item        : "guidebox_getid",
            template_detail      : "guidebox_getid_details",
            li_width             : 120,
            li_height            : 105
        },
	force_no_fold: true
    };

    console.log(a);
    Spice.render(a);
};

Handlebars.registerHelper("checkSeason", function(season_number, episode_number, options) {
    if(season_number !== "0") {
	return options.fn({
	    season_number: season_number, 
	    episode_number: episode_number
	});
    }
});

Handlebars.registerHelper("getQuery", function() {
    return ddg_spice_guidebox_getid.metadata.query;
});

Handlebars.registerHelper("getTitle", function() {
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
    
    if (options.hash && options.hash.singular && options.hash.plural){
        var arr = string.split("|");
        return arr.length > 1 ? options.hash.plural : options.hash.singular
    }
    return "";
});

Handlebars.registerHelper("split", function(string) { 
    return string.replace(/^\||\|$/g, "").replace(/\|/g, ", ");
});

Handlebars.registerHelper("creators", function(options) {
    
    if (this.writers.length || this.directors.length){
        return options.fn(this)
    }
    return "";
});

Handlebars.registerHelper("get_network", function(options) {  
    return ddg_spice_guidebox_getid.metadata.network;
});
