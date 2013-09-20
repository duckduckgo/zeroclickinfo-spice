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
        Spice.render({
            data              : api_result,
            header1           : "Albums from " + artist,
            source_name       : "Last.fm",
            source_url        : "http://www.last.fm/search?q=" + artist + "&type=album",

	    spice_name        : "lastfm_artist_album",
            template_frame    : "list",
            template_options  : {
                items: api_result.topalbums.album,
                template_item: "lastfm_artist_album",
                show: 3,
                max: 10,
                type: "ul"
            },

            force_big_header  : true,
            force_no_fold     : true
        });
    }
};
