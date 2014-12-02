(function (env) {
    "use strict";
    env.ddg_spice_lastfm_top_tracks = function (api_result) {

        if(api_result.error || !api_result.toptracks || !api_result.toptracks.track || api_result.toptracks.track.length === 0) {
            Spice.failed('lastfm_top_tracks');
        }
 
        Spice.add({
            id: 'lastfm_top_tracks',
            name: 'Top Songs (' + api_result.toptracks['@attr'].country + ')',
            data: api_result.toptracks.track,
            meta: {
                itemType: 'Tracks',
                sourceName: 'Last.fm',
                sourceUrl: 'http://www.last.fm/charts/tracks/top',
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
                    heading: item.name + " - " +item.artist.name,
                    url: item.url,
                    reviewCount: "♬ " + DDG.commifyNumber(item.listeners),
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
                Spice.getDOM('lastfm_top_tracks').find('.stars').hide();
            }
        });
    };
}(this));

