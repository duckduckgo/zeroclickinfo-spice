function ddg_spice_video(api_result) {
    if(!api_result || api_result.length === 0) {
        return;
    }

    $.ajaxSetup({
        cache: true
    });

    var encodedQuery = DDG.get_query_encoded().replace(/(?:youtube|videos?)/i, '');
    
    // Change the "More at ..." link.
    var change_more = function(obj) {
	var more_at_link = $(".zero_click_more_at_link");
	more_at_link.attr("href", obj.search_link);
        more_at_link.find("img").attr("src", obj.image);
        more_at_link.find("span").html(obj.text);
    };

    var provider_data = {
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

    // Copy provider-specific data to the item.
    $.map(api_result, function(item) {
	item.provider_data = provider_data[item.provider];
    });
    
    Spice.render({
        data: api_result,
        source_name : 'YouTube',
        source_url : 'https://www.youtube.com/results?search_query=' + encodedQuery,
        header1 :  decodeURIComponent(encodedQuery) + " (Video)",
	spice_name: "video",
        template_frame: "carousel",
	template_options: {
	    items: api_result,
	    template_item: "video",
	    template_detail: "video_detail",
	    li_width: 120,
	    single_item_handler: function(obj) {
		obj.data[0].provider_data.embed_options.autoplay = 0;
	    }
	},
        force_no_fold : 1,
	item_callback: function(i, item) {
	    var more_at_link = $(".zero_click_more_at_link").get(0);
	    change_more({
		"search_link": item.provider_data.search_link + encodedQuery,
		"image": item.provider_data.image,
		"text": item.provider_data.text
	    });
	    resizeDetail();
	}
    });

    function resizeDetail() {
	var $video = $("#spice_video");
	var width = $video.width() - 18;
	var height = Math.floor(width * 0.5625) + 30;
	$("#spice_video #video-embed").width(width);
	$("#spice_video #video-embed").height(height);

	var video_title = $("#spice_video #spice_video-title").width();
	var video_links = $("#spice_video .links").width();

	if(width - (video_title + video_links) < 20) {
	    $("#spice_video .links").css("position", "static");
	} else {
	    $("#spice_video .links").css("position", "absolute");
	}
    }

    $(document).ready(function() {
	resizeDetail();
	$(window).resize(resizeDetail);
    });

    // Expose the function so that ddg_spice_video.itunes can use it.
    ddg_spice_video.resizeDetail = resizeDetail;
}

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
	    // We need to resize when we add in the iTunes button.
	    ddg_spice_video.resizeDetail();
	    break;
	}
    }

};

Handlebars.registerHelper("userURL", function(provider_data, uploader) {
    return provider_data.user_url + uploader; 
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

Handlebars.registerHelper("embedURL", function(provider_data, id) {
    function parameters(embed_options) {
	var result = [];
	for(o in embed_options) {
	    result.push(o + "=" + embed_options[o]);
	}
	return result.join("&");
    }

    return provider_data.embed + id + "?" +
	parameters(provider_data.embed_options);

    return "";
});

Handlebars.registerHelper("playURL", function(provider_data, id) {
    return provider_data.play_url + id;
});

Handlebars.registerHelper("checkStatistics", function(viewCount, options) {
    if(viewCount === null) {
	return "";
    }
    return options.fn({viewCount: viewCount});
});
