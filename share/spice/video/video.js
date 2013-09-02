function ddg_spice_video(api_result) {
    if(!api_result || api_result.length === 0) {
        return;
    }

    $.ajaxSetup({
        cache: true
    });

    var query = DDG.get_query();

    // Exit if the word "khan" exists.
    // We want the Khan academy plugin to take precedence.
    if(query.match(/\bkhan\b/)) {
	return;
    }

    // TODO: Remove only the trigger words that appear at the beginning or at the end of the string.
    var triggers = ["videos?", "youtube", "vimeo"].join("|");
    // Remove the trigger word.
    query = query.replace(new RegExp(triggers, "i"), "");
    // Remove extra spaces.
    query = query.replace(/\s+/, " ");
    // Trim spaces at the end and at the beginning. We can use String.prototype.trim, but that's only on ECMAScript 5 browsers.
    query = query.replace(/^\s+|\s+$/, "");
    var encodedQuery = encodeURIComponent(query);

    // Change the "More at ..." link.
    var change_more = function(obj) {
	var more_at_link = $(".zero_click_more_at_link");
	more_at_link.attr("href", obj.search_link);
        more_at_link.find("img").attr("src", obj.image);
        more_at_link.find("span").html(obj.text);
    };

    Spice.render({
        data: api_result,
        source_name : 'YouTube',
        source_url : 'https://www.youtube.com/results?search_query=' + encodedQuery,
        header1 :  decodeURIComponent(encodedQuery) + " (Video Search)",
        template_frame: "carousel",
        template_normal: "video",
        carousel_css_id: "video",
        carousel_items: api_result,
        force_no_fold : 1,
        carousel_template_detail: "video_detail",
	template_options: {
	    li_width: 120
	},
	item_callback: function(i, item) {
	    var more_at_link = $(".zero_click_more_at_link").get(0);
	    if(item.provider in ddg_spice_video.providers) {
		var providers = ddg_spice_video.providers;
		change_more({
		    "search_link": providers[item.provider].search_link + encodedQuery,
		    "image": providers[item.provider].image,
		    "text": providers[item.provider].text
		});
	    }
	    resizeDetail();
	}
    });

    function resizeDetail() {
	var $video = $("#spice_video");
	var width = $video.width() - 18;
	var height = Math.floor(width * 0.5625) + 30;
	$("#video #embed").width(width);
	$("#video #embed").height(height);

	var video_title = $("#video #video-title").width();
	var video_links = $("#video .links").width();

	if(width - (video_title + video_links) < 20) {
	    $("#video .links").css("position", "static");
	} else {
	    $("#video .links").css("position", "absolute");
	}
    }

    $(document).ready(function() {
	resizeDetail();
	$(window).resize(resizeDetail);
    });
}

ddg_spice_video.providers = {
    "YouTube": {
	"search_link": "https://www.youtube.com/results?search_query=",
	"image": "https://icons.duckduckgo.com/i/www.youtube.com.ico",
	"text": "More at YouTube",
	"embed": "https://www.youtube-nocookie.com/embed/",
	"play_url": "https://www.youtube.com/watch?v=",
	"user_url": "https://www.youtube.com/user/",
	"embed_options": {
	    "iv_load_policy": 3,
	    "autoplay": 1,
	    "wmode": "opaque"
	}
    },
    "Vimeo": {
	"search_link": "https://www.vimeo.com/search?q=",
	"image": "https://icons.duckduckgo.com/i/www.vimeo.com.ico",
	"text": "More at Vimeo",
	"embed": "https://player.vimeo.com/video/",
	"play_url": "https://vimeo.com/",
	"user_url": "https://vimeo.com/",
	"embed_options": {
	    "api": 0,
	    "autoplay": 1
	}
    }
};

// This is the callback function of /itt.
ddg_spice_video.itunes = function(api_result) {
    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var itunes = $("#itunes");
    var artist = itunes.data("artist").toLowerCase();
    var song = itunes.data("song").toLowerCase();

    // Find the song that matches.
    for(var i = 0; i < api_result.results.length; i++) {
	if(artist === api_result.results[i].artistName.toLowerCase() ||
	   artist === api_result.results[i].trackName.toLowerCase() ||
	   song === api_result.results[i].artistName.toLowerCase() ||
	   song === api_result.results[i].trackName.toLowerCase()) {
	    itunes.attr("href", api_result.results[i].trackViewUrl);
	    itunes.toggle();
	    break;
	}
    }

};

Handlebars.registerHelper("userURL", function(provider, uploader) {
    if(provider in ddg_spice_video.providers) {
	return ddg_spice_video.providers[provider].user_url + uploader; 
    }
    return "";
});

Handlebars.registerHelper("checkMusic", function(category, title, options) {
    // Remove things from the title that we don't really need.
    var stripTitle = function(s) {
	// Remove things like "(Explicit)".
	s = s.replace(/\(.*\)|\[.*\]/g, "");
	// Remove things like "feat. Alicia Keys".
	s = s.replace(/\s+f(?:ea|)t\..*$/g, "");
	// Trim the ends of the string.
	return s.replace(/^\s+|\s+$/g, "");
    };

    title = stripTitle(title);
    var songData = title.split(" - ");
    var artist = songData[0];
    var song = songData[1] || artist;

    // Call iTunes.
    $.getScript("/iit/" + encodeURIComponent(title));

    // Only add links to the music if, well, we have links to the music section.
    if(category === "Music") {
	// There's no need to escape the values--Handlebars.js does this for us.
	return options.fn({
	    title: title,
	    artist: artist,
	    song: song
	});
    }
});

// We'll use this for showing the view counts.
Handlebars.registerHelper("formatViews", function(views) {
    "use strict";
    if(views) {
	return String(views).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
    }
});

Handlebars.registerHelper("embedURL", function(provider, id) {
    function parameters(embed_options) {
	var result = [];
	for(o in embed_options) {
	    result.push(o + "=" + embed_options[o]);
	}
	return result.join("&");
    }

    if(provider in ddg_spice_video.providers) {
	return ddg_spice_video.providers[provider].embed + id + "?" +
	    parameters(ddg_spice_video.providers[provider].embed_options);
    }
    return "";
});

Handlebars.registerHelper("playURL", function(provider, id) {
    if(provider in ddg_spice_video.providers) {
	return ddg_spice_video.providers[provider].play_url + id;
    }
    return "";
});

Handlebars.registerHelper("checkStatistics", function(viewCount, options) {
    if(viewCount === null) {
	return "";
    }
    return options.fn({viewCount: viewCount});
});
