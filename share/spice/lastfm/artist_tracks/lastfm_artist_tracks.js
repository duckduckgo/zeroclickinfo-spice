var ddg_spice_lastfm_artist_tracks = function(api_result) {

    // Don't do anything if we find an error.
    if(api_result.error || !api_result.toptracks || !api_result.toptracks.track || api_result.toptracks.track.length === 0) {
        return;
    }

    var artist = api_result.toptracks.track[0].artist.name;
    Spice.render({
        data              : api_result,
        header1           : "Tracks from " + artist,
        force_big_header  : true,
        source_name       : "Last.fm",
        source_url        : "http://www.last.fm/search?q=" + artist + "&type=track",
        template_normal   : "lastfm_artist_tracks",
        force_no_fold     : true
    });
};