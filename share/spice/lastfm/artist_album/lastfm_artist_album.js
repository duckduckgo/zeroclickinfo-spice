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
    if(DDG.isRelevant(artist, skip)) {
        Spice.render({
            data              : api_result,
            header1           : "Albums from " + artist,
            force_big_header  : true,
            source_name       : "Last.fm",
            source_url        : "http://www.last.fm/search?q=" + artist + "&type=album",
            template_normal   : "lastfm_artist_album"
        });
    }
};