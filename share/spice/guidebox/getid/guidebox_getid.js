// Description:
// Show last 3 episodes.
//
// Dependencies:
// Requires jQuery.
//
// Commands:
// watch NCIS - shows last 3 episodes
//

GB_global = { "more" : "", "type" : "", "query" : "", "searched" : ""};

function ddg_spice_guidebox_getid (api_result)
{
    "use strict";

    if (!api_result.results) return;

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    var metadata = {};
    metadata.res_type = api_result.results.result[0].type;
    metadata.more = api_result.results.result[0].url;
    ddg_spice_guidebox_getid.metadata = metadata;


    if (metadata.res_type === "series"){
        ddg_spice_guidebox_getid.metadata.searched = api_result;
        //delete ddg_spice_guidebox_getid.metadata.searched.results.result[0];
        $.getScript("/js/spice/guidebox/lastshows/"+ api_result.results.result[0].type + "/" + api_result.results.result[0].id);
    } else {
        ddg_spice_guidebox_getid.render(api_result);
    }
}

function ddg_spice_guidebox_lastshows(api_result)
{
    ddg_spice_guidebox_getid.render(api_result);
}

ddg_spice_guidebox_getid.render = function(api_result) {
    "use strict";

    var terms = ["full episodes of", "full free episodes of", 
                   "free episodes of", "guidebox", "watch", 
                   "full episodes", "watch free", "full free episodes", 
                   "free episodes"];
    var i;

    var query = DDG.get_query();

    for (i in terms){
        query = query.replace(terms[i], "");
    }

    var metadata = ddg_spice_guidebox_getid.metadata;

    var options = {
            data : api_result,
            force_big_header : true,
            source_name : "Guidebox",
            source_url : metadata.more,
            template_frame : "carousel",
            carousel_css_id: "guidebox",
            carousel_items : api_result.results.result,
            force_no_fold : 1,
            template_options : {
                li_width : 120,
                li_height : 135
            }
    };

    if (metadata.res_type === "series"){
        options.header1 = "Watch full episodes of " + query + " (Guidebox)";
        options.template_normal = "guidebox_getid_series";
    } else if (metadata.res_type === "movie"){
        options.header1 = "Watch full movie: " + query + " (Guidebox)";
        options.template_normal = "guidebox_getid_movie";
        options.carousel_template_detail = "guidebox_getid_movie_details";
    }

    Spice.render(options);

    $("a.GB_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
};

Handlebars.registerHelper("getSimilar", function() {
    "use strict";

    return ddg_spice_guidebox_getid.metadata.searched.results.result;
});

Handlebars.registerHelper("getDate", function(first_aired) {
    "use strict";

    var datesplit;
    var months = {
            '01' : 'Jan.',
            '02' : 'Feb.',
            '03' : 'Mar.',
            '04' : 'Apr.',
            '05' : 'May',
            '06' : 'Jun.',
            '07' : 'Jul.',
            '08' : 'Aug.',
            '09' : 'Sep.',
            '10' : 'Oct.',
            '11' : 'Nov.',
            '12' : 'Dec.',
    };

    datesplit = first_aired.split('-');
    return months[datesplit[1]] + ' ' + datesplit[2] + ', ' + datesplit[0];

});
