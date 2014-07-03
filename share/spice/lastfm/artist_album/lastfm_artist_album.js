function ddg_spice_lastfm_artist_album (api_result) {
    var skip = [
        "albums",
        "records",
        "cd",
        "cds"
    ];

    // Don't do anything if we find an error.
    if(api_result.error || !api_result.topalbums || !api_result.topalbums.album || api_result.topalbums.album.length === 0) {
        return;
    }

    var artist = api_result.topalbums.album[0].artist.name;
    if (DDG.isRelevant(artist, skip)) {
        Spice.add({
            data              : api_result,
            header1           : "Albums from " + artist,
            sourceName       : "Last.fm",
            sourceUrl        : "http://www.last.fm/search?q=" + artist + "&type=album",

        id        : "lastfm_artist_album",
            template_frame    : "list",
            templates  : {
                items: api_result.topalbums.album,
                item: Spice.lastfm_artist_album.lastfm_artist_album,
                show: 3,
                max: 10,
                type: "ul"
            },

            
            
        });
    }
};
