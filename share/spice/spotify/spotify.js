(function (env) {
    "use strict";
    env.ddg_spice_spotify = function(api_result){

        var query = DDG.get_query();
        query = query.replace(/spotify/, ""); //replace trigger words from query

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.tracks.items.length === 0) {
            return Spice.failed('spotify');
        }

        // Render the response
        Spice.add({
            id: "spotify",

            // Customize these properties
            name: "Spotify",
            data: api_result.tracks.items,
            meta: {
                sourceName: "Spotify.com",
                sourceUrl: 'https://api.spotify.com/v1/search?q=' + query.trim() + '&type=track',
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    image: item.album.images[1].url, /* ~300x300px */
                    streamURL: item.preview_url,
                    url: item.external_urls.spotify
                };
            },
            templates: {
                item: 'audio_item',
                detail: false
            }
        });
    };
}(this));