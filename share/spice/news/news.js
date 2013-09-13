function ddg_spice_news(api_result) {
    "use strict";

    // Exit if we didn't get any results.
    if(api_result.length === 0) {
	return;
    }

    // Words that we have to skip in DDG.isRelevant.
    var skip = [
	"news",
	"headline",
	"headlines",
	"latest",
	"breaking",
	"update",
	"s:d",
	"sort:date"
    ];

    var generic = false;
    if((/news/i).test(DDG.get_query())) {
	generic = true;
    }

    // Display the plugin.
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

    // This function changes the "More at ..." link.
    var change_more = function(obj) {
	var image = Handlebars.helpers.favicon.call({source_url: obj.url, forces: {}});
	var more_at_link = $(".zero_click_more_at_link");
	more_at_link.attr("href", obj.url);
        more_at_link.find("img").attr("src", image);
        more_at_link.find("span").html("More at " + obj.source);
    }

    // We only change the "More at ..." link when we move to the next item in the carousel. 
    // We can only move to the next item when:
    // 1. The left or right button is clicked.
    // 2. The dots are clicked.
    var n = api_result.length,
        index = 0;

    // Left link.
    $("#preva").click(function() {
	if(index !== 0) {
	    change_more(api_result[--index]);
	}
    });

    // Right link.
    $("#nexta").click(function() {
	if(index < n - 1) {
	    change_more(api_result[++index]);
	}
    });

    // Dots.
    $("#ddgc_dots").click(function() {
	var a = $(this).find("a");
	if(a.length > 0) { 
	    a.each(function(i) {
		if($(this).hasClass("ddgc_selected")) {
		    index = i;
		    change_more(api_result[index]);
		}
	    });
	}
    });
}
