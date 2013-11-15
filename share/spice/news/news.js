function ddg_spice_news(api_result) {
    "use strict";

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

    // Check if the word news is in the query.
    var generic = false;
    if((/\bnews\b/i).test(DDG.get_query())) {
        generic = true;
    }

    // Some sources need to be set by us.
    var getSource = function(story) {
        switch(story.syndicate) {
            case "Topsy":
            story.source = story.author || "Topsy";
            break;
            case "NewsCred":
            if(story.source) {
		if(story.author) {
		    story.source = story.source + " by " + story.author;
		}
	    } else {
		story.source = "NewsCred";
	    }
            break;
        }
    };

    // Trim the snippet and the title using this function.
    // We don't want to trim in the middle of a word.
    var ellipsis = function(text, limit) {
	var result = [];
	var count = 0;
	var words = text.split(" ");

	for(var i = 0; i < words.length; i++) {
	    count += words[i].length + 1;
	    if(count < limit) {
		result.push(words[i]);
	    }
	}

	// Return the same text if we weren't able to trim.
	if(result.length === 0) {
	    return text;
	}

	var append = words.length > result.length;
	result = result.join(" ");

	// Count the number of opening and closing tags.
	var open_b = result.split("<b>").length - 1;
	var close_b = result.split("</b>").length - 1;

	// Check if there is a mismatch.
	result += open_b > close_b ? "</b>" : "";

	if(append && !(result[result.length - 1].match(/\.$/))) {
	    return result + "...";
	}
	return result;
    };

    for(var i = 0, story; story = api_result[i]; i++) {
	story.title = story.title.replace(/<b>|<\/b>|:/g, "");
    }

    var good_stories = [];
    if(generic) {
        good_stories = api_result;
    } else {
        for(var i = 0, story; story = api_result[i]; i++) {
	    if(DDG.isRelevant(story.title, skip, 3)) {
                getSource(story);
                good_stories.push(story);
            }
        }
    }

    // Exit if we didn't get any results.
    if(good_stories.length === 0) {
        return;
    }

    if(good_stories.length > 1) {
	for(var i = 0, story; story = good_stories[i]; i++) {
	    story.title = ellipsis(story.title, 55);
	    story.excerpt = ellipsis(story.excerpt, 130);
	}
    }

    // Display the plugin.
    Spice.render({
        header1: good_stories[0].query +  " (News)",
	source_url: good_stories[0].url,
	source_name: good_stories[0].source,

	spice_name: "news",

	template_frame: "carousel",
	template_normal: "news_single",
	template_options: {
	    items: good_stories,
	    template_item: "news",
	    li_width: 196,
	    li_height: 168
	}
    });

    // Since we're hiding the "More at ..." link, we should
    // also hide the element containing it, but only if it has the class "minimal".
    var hide_minimal = function() {
	if($("#ddgc_pagination").hasClass("minimal")) {
	    $("#ddgc_pagination").hide();
	} else {
	    $("#ddgc_pagination").show();
	}
    };

    $(function() {
	// Decide whether we should show or hide the #ddgc_pagination.
	hide_minimal();
	$(window).resize(hide_minimal);

	// Adjust the box margins--can't do this in css
	$("#zero_click_wrapper2 #zero_click_abstract").attr("style", 
							    "padding-left: 0px !important;" +
							    "margin-left: 0px !important;");
	$("#zero_click_more_at_wrap").toggle(false);
    });
}

Handlebars.registerHelper("getIcon", function(url) {
    return Handlebars.helpers.favicon.call({source_url: url, forces: {}});
});

Handlebars.registerHelper("getDomain", function(url) {
    re = new RegExp('^.*?\/\/([^\/\?\:\#]+)');
    if(re.test(url)) {
	return RegExp.$1;
    }
});


Handlebars.registerHelper("shortenDate", function(date) {
    date = date.split(",");

    var result = date[0];
    result = result.replace(/(&nbsp;)?days?/, "d");
    result = result.replace(/hrs?/, "h");
    result = result.replace(/mins?/, "m");

    return result;
});
