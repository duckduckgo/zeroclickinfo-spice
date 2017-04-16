(function (env) {
    "use strict";

    env.ddg_spice_lastfm_artist_album = function(api_result) {
    
        // Don't do anything if we find an error.
        if(api_result.error || !api_result.topalbums || !api_result.topalbums.album || api_result.topalbums.album.length === 0) {
            Spice.failed('lastfm_artist_album');
        }
    
        var skip = [
            "albums",
            "records",
            "cd",
            "cds"
        ];

        var artist = api_result.topalbums.album[0].artist.name;
        Spice.add({
            id: 'lastfm_artist_album',
            name: 'Albums by ' + artist,
            data: api_result.topalbums.album,
            meta: {
                itemType: 'Albums',
                sourceName: 'Last.fm',
                sourceUrl: 'http://www.last.fm/search?q=' + artist + '&type=album',
                sourceIconUrl: 'http://cdn.last.fm/flatness/favicon.2.ico'
            },
            normalize: function(item) {
                return {
                    img: item.image[2]["#text"],
                    heading: item.name,
                    url: item.url,
                    price: "▶  " + DDG.commifyNumber(item.playcount)
                };
            },
            relevancy: {
                skip_words : skip,
                primary: [
                    { key: 'artist.name' }
                ]
            },
            templates: {
                group: 'products',
                detail: false,
                item_detail: false,
                options: {
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));
