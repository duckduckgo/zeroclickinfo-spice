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

var query;
var type = 'series';
var more = '';
var results = {};

var ddg_spice_guidebox_lastshows = function (api_result){
    "use strict";

    if (!api_result.results) return;

    query = DDG.get_query().replace("watch ", "");
    query = query.replace("full episodes ", "");
    query = query.replace("full episodes of ", "");
    query = query.replace("guidebox ", "");

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    // var second_call = ddg_spice_guidebox_definition.second_api_call;
    var render = ddg_spice_guidebox_lastshows.render;

    second_call();
    render(api_result, query);


};

ddg_spice_guidebox_lastshows.second_api_call = function (){
    "use strict";

    //$.getScript("/js/spice/guidebox/search/"+ query);
};

ddg_spice_guidebox_lastshows.render = function(api_result, query) {
    "use strict";

    if (type === 'series'){
        Spice.render({
            data : api_result,
            header1 : query + " (Guidebox)",
            force_big_header : true,
            source_name : "Guidebox",
            source_url : api_result.url,
            template_normal : "guidebox_lastshows"
        });
    }
};


var ddg_spice_guidebox_search = function (api_result){
    "use strict";

    var render = ddg_spice_guidebox_definition.render;

};


Handlebars.registerHelper("recentEps", function(results) {
    "use strict";

    var out, tmp, div, div2, link, img, item, i, ep;
    out = '';
  
    // validity check
    if (results.result) {
	for (i in results.result) {
        if (i === "4") { break; }

	    item = results.result[i];

	    div = d.createElement("div");
	    div2 = d.createElement("div");

	    link = d.createElement("a");
	    link.href = item.smart_url;
	    if (item.episode_name.length >= 15) {
		item.episode_name = item.episode_name.substring(0,13) + "...";
	    }
	    img = d.createElement('img');
	    img.src = '/iu/?u='+item.thumbnail_208x117;
        img.width = "108";
        img.height = "62";
	    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
	    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
	    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
	    link.appendChild(img);
	    div.appendChild(link);

	    link = d.createElement('a');
	    link.href = item.smart_url;
    
        ep = '<br />';
        ep += 'Season #' + item.season_number;
        ep += '<br />';
        ep += 'Episode #' + item.episode_number;
        
	    link.innerHTML = item.episode_name + ep;
	    div.appendChild(link);
	    div.appendChild(d.createElement('br'));
      
	    YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
	    YAHOO.util.Dom.setStyle(div, "float", "left");
	    YAHOO.util.Dom.setStyle(div, "margin", "10px 20px 10px 0px");
	    YAHOO.util.Dom.setStyle(div, "padding", "5px");
	    
	    div2.appendChild(div);
	    out += div2.innerHTML;
	}
    }
    console.log("rendered");
    return out;

});


