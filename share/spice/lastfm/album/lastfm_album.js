ddg_spice_lastfm_album = function(api_result) {
    "use strict";

    var skip = [
        "album",
        "albums",
        "records",
        "cd",
        "cds"
    ];

    // Don't do anything if we find an error.
    if(api_result.error || !api_result.album || !api_result.album.name || !api_result.album.artist) {
        return Spice.failed('lastfm_album');
    }

    Spice.add({
        id: 'lastfm_album',
        name: 'Music',
        data: api_result.album,
        meta: {
            sourceName: 'Last.fm',
            sourceUrl: api_result.album.url,
            sourceIconUrl: 'http://cdn.last.fm/flatness/favicon.2.ico'
        },
        normalize: function(item) {
            if(!item.wiki) {
                item.wiki = {summary : item.artist};
            }
            var releasedate = item.releasedate.split(',');
            var boxData;
            if (item.tracks && item.tracks.track && item.tracks.track.length > 0) {
                boxData = [{heading: 'Tracks:'}];
                for(var i = 0; i < item.tracks.track.length; i++) {
                    var seconds = item.tracks.track[i].duration % 60;
                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }
                    boxData.push({
                        label: item.tracks.track[i].name + "   " + Math.floor(item.tracks.track[i].duration / 60) + 
                            ":" + seconds
                    });
                }
            }

            return {
                description: (DDG.strip_html(item.wiki.summary)).replace(/&quot;/g, '"'),
                infoboxData: boxData,
                image: item.image[3]["#text"],
                title: item.name + " (" + releasedate[0].trim() + ")"
            };
        },
        relevancy: {
            skip_words : skip,
            primary: [
                { key: 'name' }, { key: 'artist'}
            ]
        },
        templates: {
            group: 'info',
            options: {
                moreAt: true
            }
        }
    });
};
