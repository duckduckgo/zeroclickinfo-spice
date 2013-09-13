function ddg_spice_news(api_result) {
    "use strict";

    if(api_result.length === 0) {
	return;
    }

    console.log(api_result);

    var generic = false;
    if((/news/i).test(DDG.get_query())) {
	generic = true;
    }

    Spice.render({
	data: api_result,
	header1: "DuckDuckGo News",
	source_url: api_result[0].url,
	source_name: api_result[0].source,

	spice_name: "news",

	template_frame: "carousel",
	template_options: {
	    items: api_result,
	    template_item: "news",
	    li_width: 640
	},

	force_big_header: true,
	force_no_fold: true
    });

    var change_more = function(obj) {
	var image = Handlebars.helpers.favicon.call({source_url: obj.url, forces: {}});
	var more_at_link = $(".zero_click_more_at_link");
	more_at_link.attr("href", obj.url);
        more_at_link.find("img").attr("src", image);
        more_at_link.find("span").html("More at " + obj.source);
    }
    
    var length = api_result.length;
    var i = 0;
    $("#preva").click(function() {
	if(i !== 0) {
	    change_more(api_result[--i]);
	}
    });

    $("#nexta").click(function() {
	if(i < length - 1) {
	    change_more(api_result[++i]);
	}
    });

    $("#ddgc_dots").click(function() {
	var a = $(this).find("a");
	if(a.length > 0) { 
	    a.each(function(index) {
		if($(this).hasClass("ddgc_selected")) {
		    i = index;
		    change_more(api_result[i]);
		}
	    });
	}
    });
}
