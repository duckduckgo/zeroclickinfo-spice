function ddg_spice_video(api_result) {
    if(!api_result) {
        return;
    }

    $.ajaxSetup({
        cache: true
    });

    Spice.render({
        data: api_result,
        source_name : 'YouTube',
        source_url : 'http://www.youtube.com/',
        header1 : "Video Search",
        template_frame: "carousel",
        template_normal: "video",
        carousel_css_id: "video",
        carousel_items: api_result,
        force_no_fold : 1,
        carousel_template_detail: "video_detail",
	template_options: {
	    li_height: 150,
	    li_width: 205
	}
    });

    // Add the video on top.
    $("#ddgc_detail").prependTo("#video");
}

// This is the callback function of /itt.
// TODO: Don't show the link when we didn't find the iTunes URL.
ddg_spice_video.itunes = function(api_result) {
    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var artist = $("#itunes").data("artist").toLowerCase();
    var song = $("#itunes").data("song").toLowerCase();

    console.log("Artist: " + artist, "Song: " + song);

    // Find the song that matches.
    var index = 0;
    for(var i = 0; i < api_result.results.length; i++) {
	if(artist === api_result.results[i].artistName.toLowerCase() ||
	   artist === api_result.results[i].trackName.toLowerCase() ||
	   song === api_result.results[i].artistName.toLowerCase() ||
	   song === api_result.results[i].trackName.toLowerCase()) {
	    index = i;
	    break;
	}
    }

    window.location = api_result.results[index].trackViewUrl;
};

ddg_spice_video.set_itunes = function(element) {
    var title = $(element).data("title");

    $.getScript("/iit/" + encodeURIComponent(title));
};

Handlebars.registerHelper("checkMusic", function(category, title, options) {
    // Remove things from the title that we don't really need.
    var stripTitle = function(s) {
	// Remove things like "(Explicit)".
	s = s.replace(/\(.*\)|\[.*\]/g, "");
	// Remove things like "feat. Alicia Keys".
	s = s.replace(/\s+f(?:ea|)t\..*$/g, "");
	// Trim the ends of the string.
	return s.replace(/^\s+|\s+$/g, "");
    }

    title = stripTitle(title);
    var songData = title.split(" - ");
    var artist = songData[0];
    var song = songData[1] || artist;

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

    return String(views).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
});

Handlebars.registerHelper("embedURL", function(provider, id) {
    if(provider === "YouTube") {
	return "https://www.youtube-nocookie.com/embed/" + id;
    } else if(provider === "Vimeo") {
	return "https://player.vimeo.com/video/" + id;
    }
    return "";
});

Handlebars.registerHelper("playURL", function(provider, id) {
    if(provider === "YouTube") {
	return "https://www.youtube.com/watch?v=" + id;
    } else if(provider === "Vimeo") {
	return "https://vimeo.com/" + id;
    }
});
