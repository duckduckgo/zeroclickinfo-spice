function ddg_spice_lastfm_artist_tracks (api_result) {

    // Don't do anything if we find an error.
    if(api_result.error || !api_result.toptracks || !api_result.toptracks.track || api_result.toptracks.track.length === 0) {
        return;
    }

    var artist = api_result.toptracks.track[0].artist.name;
    Spice.render({
        data              : api_result,
        header1           : "Tracks from " + artist,
        source_name       : "Last.fm",
        source_url        : "http://www.last.fm/search?q=" + artist + "&type=track",

	    template_normal: "lastfm_artist_tracks",
	template_frame    : "list",
	template_options  : {
	    items: api_result.toptracks.track,
	    template_item: "lastfm_artist_tracks_item",
	    show: 3,
	    max: 10,
	    type: "ul"
	},

        force_big_header  : true,
	force_no_fold     : true
    });
};
