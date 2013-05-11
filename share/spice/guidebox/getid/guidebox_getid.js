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

Handlebars.registerHelper("recentEps", function(results) {
    "use strict";

    var out, tmp, div, p, link, img, play, item, i, ep, date, datesplit, name;
    out = '';

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

    // validity check
    if (results.result) {
	for (i in results.result) {
        if (i === "4") { break; }

	    item = results.result[i];

	    div = d.createElement("div");
        p = d.createElement("p");

	    link = d.createElement("a");
	    link.href = item.smart_url;
	    if (item.episode_name.length >= 15) {
		item.episode_name = item.episode_name.substring(0,13) + "...";
	    }
	    img = d.createElement('img');
        play = d.createElement('img');
	    img.src = '/iu/?u='+item.thumbnail_208x117;
        img.width = "108";
        img.height = "62";

        play.src = '/iu/?u=http://duckduckgo.com/assets/icon_play.v101.png';

	    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
	    YAHOO.util.Dom.setStyle(play, "visibility", 'visible');
	    YAHOO.util.Dom.setStyle(play, "z-index", '100');
	    YAHOO.util.Dom.setStyle(play, "margin", '-50px auto 15px');

	    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
        p.appendChild(img);
        p.appendChild(play);
	    link.appendChild(p);
    
        datesplit = item.first_aired.split('-')
        date = months[datesplit[1]] + ' ' + datesplit[2] + ', ' + datesplit[0];
        
        ep = d.createElement('span');
        name = d.createElement('span');
        name.innerHTML = item.episode_name;

	    YAHOO.util.Dom.addClass(ep, 'smaller');
        ep.innerHTML += 'Season ' + item.season_number;
        ep.innerHTML += ', Episode ' + item.episode_number;
        ep.innerHTML += '<br />';
        ep.innerHTML += date;

        link.appendChild(name);
	    div.appendChild(link);
        div.appendChild(d.createElement('br'));
	    div.appendChild(ep);
	    div.appendChild(d.createElement('br'));
      
	    YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
	    YAHOO.util.Dom.setStyle(div, "float", "left");
	    YAHOO.util.Dom.setStyle(div, "margin", "10px 20px 10px 0px");
	    YAHOO.util.Dom.setStyle(div, "padding", "5px");
	    
	    out += div.innerHTML;
	}
    }
    return out;

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

