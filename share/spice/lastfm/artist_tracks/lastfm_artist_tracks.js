function ddg_spice_lastfm_artist_tracks (api_result) {

    // Don't do anything if we find an error.
    if(api_result.error || !api_result.toptracks || !api_result.toptracks.track || api_result.toptracks.track.length === 0) {
        return;
    }

    var artist = api_result.toptracks.track[0].artist.name;
    Spice.add({
        data              : api_result,
        header1           : "Tracks from " + artist,
        sourceName       : "Last.fm",
        sourceUrl        : "http://www.last.fm/search?q=" + artist + "&type=track",

    id        : "lastfm_artist_tracks",
        template_frame    : "list",
        templates  : {
            items: api_result.toptracks.track,
            item: Spice.lastfm_artist_tracks.lastfm_artist_tracks,
            show: 3,
            max: 10,
            type: "ul"
        },

        
        
    });
};
