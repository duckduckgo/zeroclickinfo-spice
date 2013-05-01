// Description:
// Show definition of TV show/movie and last 3 episodes.
//
// Dependencies:
// Requires jQuery.
//
// Commands:
// watch NCIS - gives the definition of TV show NCIS and shows last 3 episodes
//
// Notes:
// ddg_spice_guidebox_definition - 
// ddg_spice_guidebox_lastshows - 

var ddg_spice_guidebox_definition = function (api_result){
    var query = DDG.get_query().replace("watch", "");
        query = query.replace("full episodes", "");
        query = query.replace("full episodes of", "");
        query = query.replace("guidebox", "");

    var render = ddg_spice_dictionary_definition.render;

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    render(api_result);


};

ddg_spice_guidebox_definition.render = function(res) {
    "use strict";

    Spice.render({
        data : res,
        header1 : "Definition (Guidebox)",
        force_big_header : true,
        source_name : "Guidebox",
        source_url : res["guidebox_url"],
        template_normal : "guidebox_definition"
    });

    $.getScript("/js/spice/guidebox/lastshows/series/"+ res["id"]);
};

var ddg_spice_guidebox_lastshows = function (api_result){


};
