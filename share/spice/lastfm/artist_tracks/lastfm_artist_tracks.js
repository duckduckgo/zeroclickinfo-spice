(function (env) {
    "use strict";

    env.ddg_spice_lastfm_artist_tracks = function (api_result) {
    
        // Don't do anything if we find an error.
        if(api_result.error || !api_result.toptracks || !api_result.toptracks.track || api_result.toptracks.track.length === 0) {
            Spice.failed('lastfm_artist_tracks');
        }

        var artist = api_result.toptracks.track[0].artist.name;
        Spice.add({
            id: 'lastfm_artist_tracks',
            name: 'Tracks by ' + artist,
            data: api_result.toptracks.track,
            meta: {
                itemType: 'Tracks',
                sourceName: 'Last.fm',
                sourceUrl: 'http://www.last.fm/search?q=' + artist + '&type=track',
                sourceIconUrl: 'http://cdn.last.fm/flatness/favicon.2.ico'
            },
            normalize: function(item) {
                var seconds = item.duration % 60;
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
 
                if (!item.image) {
                    return;
                }

                return {
                    img: item.image[2]["#text"],
                    heading: item.name,
                    url: item.url,
                    reviewCount: "▶ " + DDG.commifyNumber(item.playcount),
                    price: Math.floor(item.duration / 60) + ":" + seconds,
                };
            },
            templates: {
                group: 'products',
                detail: false,
                item_detail: false,
                options: {
                    moreAt: true,
                    reviewCount: true
                }
            },
            onShow: function () {
                Spice.getDOM('lastfm_artist_tracks').find('.stars').hide();
            }
        });
    };
}(this));
