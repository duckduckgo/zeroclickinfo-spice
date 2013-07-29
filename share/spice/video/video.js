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
        header1 : "YouTube",
        template_frame: "carousel",
        template_normal: "video",
        carousel_css_id: "video",
        carousel_items: api_result,
        force_no_fold : 1,
        carousel_template_detail: "video_detail",
	template_options: {
	    li_width: 152
	}
    });
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
	console.log(api_result.results[i].artistName, api_result.results[i].trackName);

	if(artist === api_result.results[i].artistName.toLowerCase() ||
	   artist === api_result.results[i].trackName.toLowerCase() ||
	   song === api_result.results[i].artistName.toLowerCase() ||
	   song === api_result.results[i].trackName.toLowerCase()) {
	    index = i;
	    break;
	}
    }

    console.log("Redirecting!");
    window.location = api_result.results[index].trackViewUrl;
};

ddg_spice_video.set_itunes = function(element) {
    var title = $(element).data("title");

    console.log("Title is " + title);
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

    var original_title = title;
    title = stripTitle(title);
    var songData = title.split(" - ");
    var artist = songData[0];
    var song = songData[1] || artist;

    if(category === "Music") {
	// There's no need to escape the values--Handlebars.js does this for us.
	return options.fn({
	    title: title,
	    artist: artist,
	    song: song
	});
    }
});

Handlebars.registerHelper("formatViews", function(views) {
    "use strict";

    return String(views).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
});
