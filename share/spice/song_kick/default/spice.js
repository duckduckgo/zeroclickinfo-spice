function ddg_spice_song_kick_default_artist(result) {
    if (result.resultsPage.results.artist){
        var artist = result.resultsPage.results.artist[0];

        if (artist.identifier){

            calendar_url = "http://duckduckgo.com?q=" 
                         + encodeURIComponent("songkick calendar artist_name="
                         + artist.displayName);
            setlist_url  = "http://duckduckgo.com?q="
                         + encodeURIComponent("songkick setlist artist_name="
                         + artist.displayName);
            
            var abstract = '<a href ="' + calendar_url + '">View Calendar</a> | '
                         + '<a href ="' + setlist_url + '">View Setlists</a>';
            
            answer = new Array();
            answer["abstract"]  = abstract;
            answer["header"]    = artist.displayName;
            answer["url"]       = artist.uri;
            
            return_items(answer);
        }
    }
}

function return_items(data){

    if (data) {
        items = [[]];
        items[0]['a'] = data["header"] + ": " + data["abstract"];
        // items[0]['h'] = "SongKick (" + data["header"] + ")";
        items[0]['s'] = "SongKick";
        items[0]['u'] = data["url"];
        items[0]['f'] = 1;
        // items[0]['force_big_header'] = 1;
        // items[0]['force_big_header'] = true;
        // items[0]['force_space_after'] = true;

        // Render
        nra(items);
    }
}