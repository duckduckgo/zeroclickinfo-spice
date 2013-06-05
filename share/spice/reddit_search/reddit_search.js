function ddg_spice_reddit(api_result) {
    var query = DDG.get_query();
    var subreddit = query.match(/\/?r\/\w+/);
    var restrict_sr = false;
    var header = '(Reddit)';

    if (subreddit) {
        subreddit = subreddit[0];
        restrict_sr = true;
    }

    query = query.replace(/^\s*(\/?r\/\w+|reddit|subreddit\s*\w+)\s+/, "");
    header = query + ' ' + header;

    var source = "http://www.reddit.com/r/";
    if (restrict_sr) {
        source += subreddit.replace(/\/?r\//, "")
                + '/search?q=' + query
                + '&restrict_sr=on&sort=relevance';
    } else {
        source += '/search?q=' + query;
    }

    Spice.render({
        data              : api_result.data.children,
        header1           : header,
        source_url        : source,
        source_name       : 'Reddit',
        template_normal   : 'reddit_search',
        force_big_header  : true,
        force_space_after : true
    });
};