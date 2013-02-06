function ddg_spice_lastfm_top_tracks(lastfm) {
    // console.log(lastfm);
    if(lastfm.toptracks.track){
        var songs = '<div style="top"><ul>', length = 5, duration;
        for(var i = 0;i < length;i++) {
            duration = lastfm.toptracks.track[i].duration;
            var min = 0;
            var sec = 0;
            if(duration) {
                duration = Number(duration);
                if(duration >= 60) {
                    min = Math.floor(duration / 60);
                    sec = duration - (min * 60);
                } else {
                    sec = String(duration);
                }
                min = ' ' + min + 'min. ';
                sec += 'sec.';
            } else {
                min = '';
                sec = '';
            }
            songs += '<li><a href="/?q=' + encodeURIComponent(lastfm.toptracks.track[i].name + ' song by ' + lastfm.toptracks.track[i].artist.name) + '">' + 
                    lastfm.toptracks.track[i].name + '</a>';
            songs += ' by <a href="/?q=' + encodeURIComponent('artist ' + lastfm.toptracks.track[i].artist.name) + '">' +
                    lastfm.toptracks.track[i].artist.name + '</a>';// <span style="color: rgb(119, 119, 119); font-size: 11px; ">';
            //songs += min + sec + '</span>';
        }
        songs += '</ul></div>';
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = songs;
        items[0]['h'] = 'Top Songs (' + lastfm.toptracks["@attr"].country + ')';
        items[0]['s'] = 'Last.fm';
        items[0]['u'] = 'http://www.last.fm/charts/tracks/top';
        items[0]['force_no_fold'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        //items[0]['i'] = 'http://cdn.last.fm/flatness/apple-touch-icon.png';
        nra(items,1,1);
    }
}