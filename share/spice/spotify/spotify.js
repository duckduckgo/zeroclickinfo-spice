(function (env) {
    'use strict';
    env.ddg_spice_spotify = function(api_result){

        var query = DDG.get_query();
        query = query.replace(/on spotify/, '');

        if (!api_result || api_result.tracks.items.length === 0) {
            return Spice.failed('spotify');
        }

        Spice.add({
            id: 'spotify',
            name: 'Audio',
            data: api_result.tracks.items,
            meta: {
                sourceName: 'Spotify',
                sourceUrl: 'https://play.spotify.com/search/' + query.trim(),
            },
            normalize: function(item) {
                if (!item.album.images.length) {
                    return null;
                }

                return {
                    title: item.name,
                    album: item.album.name,
                    image: item.album.images[1].url, /* ~300x300px */
                    streamURL: '/audio?u=' + item.preview_url,
                    url: item.external_urls.spotify,
                    duration: Math.min(30000, item.duration_ms)
                };
            },
            templates: {
                item: 'audio_item',
                detail: false,
                options: {
                    footer: Spice.spotify.footer
                }
            }
        });
    };
}(this));
