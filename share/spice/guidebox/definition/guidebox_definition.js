// Description:
// Show definition of TV show/movie and last 3 episodes.
//
// Dependencies:
// Requires jQuery.
//
// Commands:
// watch NCIS - gives the definition of TV show NCIS and shows last 3 episodes and 3 similar shows in name
//
// Notes:
// ddg_spice_guidebox_definition - 
// ddg_spice_guidebox_lastshows - 

var query;

var ddg_spice_guidebox_definition = function (api_result){
    "use strict";

    query = DDG.get_query().replace("watch ", "");
    query = query.replace("full episodes ", "");
    query = query.replace("full episodes of ", "");
    query = query.replace("guidebox ", "");

    var render = ddg_spice_dictionary_definition.render;

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    render(api_result, query);


};

ddg_spice_guidebox_definition.render = function(api_result, query) {
    "use strict";

    Spice.render({
        data : api_result,
        header1 : api_result.title + " (Guidebox)",
        force_big_header : true,
        source_name : "Guidebox",
        source_url : api_result.guidebox_url,
        template_normal : "guidebox_definition"
    });

    //$.getScript("/js/spice/guidebox/lastshows/"+ query);
    //$.getScript("/js/spice/guidebox/search/"+ query);
};

var ddg_spice_guidebox_lastshows = function (api_result){
    "use strict";
 
    var render = ddg_spice_guidebox_definition.render;

    render(api_result, query)
};

var ddg_spice_guidebox_search = function (api_result){
    "use strict";

    var render = ddg_spice_guidebox_definition.render;

    render(api_result, query);

};
