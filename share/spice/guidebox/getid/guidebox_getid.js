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

var ddg_spice_guidebox_getid = function (api_result){
    "use strict";

    if (!api_result.results) return;

    var queries = ["full episodes of", "full free episodes of", 
                   "free episodes of", "guidebox", "watch", 
                   "full episodes", "watch free", "full free episodes", 
                   "free episodes"];
    var i;

    api_result.GB_query = DDG.get_query();

    for (i in queries){
        api_result.GB_query = api_result.GB_query.replace(queries[i], "");
    }

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    var second_call = ddg_spice_guidebox_getid.second_api_call;

    api_result.GB_type = api_result.results.result[0].type;
    api_result.GB_more = api_result.results.result[0].url;

    if (api_result.results.result[0].type !== "movie"){
        
        second_call(api_result);
    } else {
        var render = ddg_spice_guidebox_getid.render;
        render(api_result);
    }
};

var ddg_spice_guidebox_lastshows = function (api_result){
    var render = ddg_spice_guidebox_getid.render;
    render(api_result);
};

ddg_spice_guidebox_getid.second_api_call = function (api_result){
    "use strict";

    $.getScript("/js/spice/guidebox/lastshows/"+ api_result.results.result[0].type + "/" + api_result.results.result[0].id);
};

Handlebars.registerHelper("getSimilar", function() {
    "use strict";

    /*var out = '<ul>', i, item;

    for (i in GB_global.searched.results.result){
        if (i === '0') continue;
        if (i === '10') break;
        item = GB_global.searched.results.result[i];
        //out += '<li> <a href="' + item.url +'">' + item.title + '</a></li>';
        out += '<li> <a href="https://duckduckgo.com/?q=guidebox ' + item.title +'">' + item.title + '</a></li>';
    }

    out += '</ul>';*/
    return GB_global.searched.results.result;
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

ddg_spice_guidebox_getid.render = function(api_result) {
    "use strict";

    var options = {
            data : api_result,
            force_big_header : true,
            source_name : "Guidebox",
            source_url : api_result.GB_more,
            template_frame : "carousel",
            carousel_css_id: "guidebox",
            carousel_items : api_result.results.result,
            force_no_fold : 1,
            template_options : {
                li_width : 120,
                li_height : 135
            }
    };

    if (api_result.GB_type === "series"){
        options.header1 = "Watch full episodes of " + GB_global.query + " (Guidebox)";
        options.template_normal = "guidebox_getid_series";
    } else if (api_result.GB_type === "movie"){
        options.header1 = "Watch full movie: " + api_result.GB_query + " (Guidebox)";
        options.template_normal = "guidebox_getid_movie";
    }

    Spice.render(options);

    $("a.GB_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
};
