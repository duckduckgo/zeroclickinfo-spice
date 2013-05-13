// Description:
// Show last 3 episodes.
//
// Dependencies:
// Requires jQuery.
//
// Commands:
// watch NCIS - shows last 3 episodes 
//
// Notes:
// ddg_spice_guidebox_lastshows - 

GB_global = { "more" : "", "type" : "", "query" : "", "searched" : ""};

var ddg_spice_guidebox_getid = function (api_result){
    "use strict";

    if (!api_result.results) return;

    var queries = ["full episodes of", "full free episodes of", "free episodes of", "guidebox", "watch", "full episodes", "watch free", "full free episodes", "free episodes"];
    var i;

    GB_global.query = DDG.get_query();

    for (i in queries){
        GB_global.query = GB_global.query.replace(queries[i], "");
        
    }

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    GB_global.type = api_result.results.result[0].type;
    GB_global.more = api_result.results.result[0].url;
    GB_global.searched = api_result

    var second_call = ddg_spice_guidebox_getid.second_api_call;

    second_call(api_result);

};

var ddg_spice_guidebox_lastshows = function (api_result){
    var render = ddg_spice_guidebox_getid.render;
    render(api_result);
};

ddg_spice_guidebox_getid.second_api_call = function (api_result){
    "use strict";

    $.getScript("/js/spice/guidebox/lastshows/"+ api_result.results.result[0].type + "/" + api_result.results.result[0].id);
};

Handlebars.registerHelper("getQuery", function() {
    "use strict";

    return GB_global.query;
});

Handlebars.registerHelper("getSimilar", function() {
    "use strict";

    var out = '<ul>', i, item;

    for (i in GB_global.searched.results.result){
        if (i === '0') continue;
        if (i === '10') break;
        item = GB_global.searched.results.result[i];
        //out += '<li> <a href="' + item.url +'">' + item.title + '</a></li>';
        out += '<li> <a href="https://duckduckgo.com/?q=guidebox ' + item.title +'">' + item.title + '</a></li>';
    }

    out += '</ul>';
    return out;
});

Handlebars.registerHelper("getDate", function(first_aired) {
    "use strict";

    var datesplit;
    var months = {
            '01' : 'January',
            '02' : 'February',
            '03' : 'March',
            '04' : 'April',
            '05' : 'May',
            '06' : 'June',
            '07' : 'July',
            '08' : 'August',
            '09' : 'September',
            '10' : 'October',
            '11' : 'November',
            '12' : 'December',
    };

    datesplit = first_aired.split('-')
    return months[datesplit[1]] + ' ' + datesplit[2] + ', ' + datesplit[0];

});

Handlebars.registerHelper("getEpisodeInfo", function(episode, season) {
    "use strict";

        return 'Season ' + season + ',Episode ' + episode;
});


ddg_spice_guidebox_getid.render = function(api_result) {
    "use strict";

    Spice.render({
        data : api_result,
        header1 : "Watch full episodes of " + GB_global.query + " (Guidebox)",
        force_big_header : true,
        source_name : "Guidebox",
        source_url : GB_global.more,
        template_normal : "guidebox_getid",
        template_frame : "carousel",
        carousel_css_id: "guidebox_getid",
        carousel_items : api_result.results.result,
        force_no_fold  : 1
    });

    $("a.GB_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
};

