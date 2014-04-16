(function(env) {
    $.ajaxSetup({ cache: true });
    var path = "/js/spice/lastfm";

    env.ddg_spice_lastfm_artist_all = function(api_result) {
	Spice.add({
	    id: 'lastfm',
	    name: 'Last.fm',
	    data: api_result.artist,
	    meta: {
		sourceName: 'Last.fm',
		sourceUrl: api_result.artist.url
	    },
	    normalize: function(o) {
		return {
		    content: DDG.strip_html(o.bio.summary),
		    item: {
			image: o.image[3]["#text"],
			title: o.name,
			meta: o.url
		    }
		};
	    },
	    templates: {
		detail: 'basic_image_detail'
	    }
	});
	
	// Should be more accurate than the name.
	$.getScript(path + "/artist_tracks/" + api_result.artist.name);
    };

    env.ddg_spice_lastfm_artist_tracks = function(api_result) {
	var songs = [];
	for(var i = 0; i < api_result.toptracks.track.length; i++) {
	    songs.push("<a href='" + api_result.toptracks.track[i].url + "'>" + api_result.toptracks.track[i].name + "</a>");
	}

	songs.splice(3);
	$(".detail__songs").html("Top Tracks: " + songs.join(", "));
    };
}(this));

// // This function checks for errors, and it's also the one that calls Spice.add.
// function ddg_spice_lastfm (api_result, template) {
//     "use strict";

//     if(template === "similar") {
//         api_result.display = false;
//     } else {
//         api_result.display = true;
//     }

//     // These words should be skipped in the isRelevant function.
//     var skip = [
//         "similar",
//         "band",
//         "bands",
//         "musician",
//         "musicians",
//         "player",
//         "artist",
//         "artists",
//         "performer",
//         "performers",
//         "singer",
//         "singers",
//         "rapper",
//         "dj",
//         "rappers",
//         "vocalist",
//         "vocalists",
//         "djs",
//         "songster",
//         "songsters",
//         "to"
//     ];

//     // Don't do anything if we find an error, or if the result is irrelevant.
//     if(api_result.error || !api_result.artist || !api_result.artist.name) {
//         return;
//     }

//     // Display the plugin.
//     if(DDG.isRelevant(api_result.artist.name, skip, 4, true)) {
//         Spice.add({
//             data             : api_result,
            
//             header1          : api_result.artist.name + " (Last.FM)",
//             sourceName      : "Last.fm",
//             sourceUrl       : api_result.artist.url,
            
//             templates: {
//             item: Spice.lastfm_artist.lastfm_artist,
//             detail: Spice.lastfm_artist.lastfm_artist
//         },
            
//         });
//     }
// };

// // This function calls artist.handlebars, and it shows everything about the artist.
// function ddg_spice_lastfm_artist_all (api_result) {
//     "use strict";

//     // Display the plugin.
//     ddg_spice_lastfm(api_result, "all");

//     // This minimizes and expands the text.
//     // This piece of code is only relevant to this function, and it's not needed
//     // when displaying similar artists.
//     $(document).ready(function() {
//         $("#expand").click(function() {
//             DDG.toggle("all", 1);
//             DDG.toggle("some", -1);
//             DDG.toggle("expand", -1);
//         });
//     });
// };

// // This function calls similar.handlebars, and it only shows the similar artists.
// function ddg_spice_lastfm_artist_similar (api_result) {
//     "use strict";

//     ddg_spice_lastfm(api_result, "similar");
// };

// // This helper removes the HTML tags, and it also shortens the text.
// Handlebars.registerHelper("snippet", function(text, method) {
//     "use strict";

//     // Remove the tags (thanks to Underscore.string).
//     var stripTags = function(text) {
//         return String(text).replace(/<\/?[^>]+>/g, "");
//     };

//     // This shortens the text.
//     if(method === "some") {
//         return stripTags(text).slice(0, 200);
//     } else {
//         return stripTags(text);
//     }
// });

// // This helper adds a comma between a list of links.
// Handlebars.registerHelper("list", function(items, options) {
//     "use strict";

//     var similar_artists = [];

//     for(var i = 0; i < items.length; i += 1) {
//         similar_artists.push(options.fn(items[i]));
//     }

//     // Only get the first n - 1 items because we want
//     // to add a coordinating conjunction before the last item.
//     var first = similar_artists.slice(0, similar_artists.length - 1);
//     first = first.join(", ");

//     return first + ", and " + similar_artists[similar_artists.length - 1] + ".";
// });
