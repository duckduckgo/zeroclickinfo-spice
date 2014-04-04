function ddg_spice_reddit(api_result) {

    if(!api_result || !api_result.data || !api_result.data.children || api_result.data.children.length === 0) {
        return;
    }

    // Check if we have search results. If we do, remove items with over_18 set to true.
    var results = [];
    if(DDG.get_is_safe_search()) {
        for(var i = 0; i < api_result.data.children.length; i++) {
            if(!api_result.data.children[i].data.over_18) {
                results.push(api_result.data.children[i]);
            }
        }
    } else {
        results = api_result.data.children;
    }

    // Check if we still have results after filtering.
    if(results.length === 0) {
        return;
    }
    
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

    Spice.add({
        data              : results,
        header1           : header,
        sourceUrl        : source,
        sourceName       : 'Reddit',
        id        : 'reddit_search',
        template_frame    : 'list',
        templates     : {
            items: results,
            show: 2,
            max: 14,
            item: Spice.reddit_search.reddit_search
        },
        
        
        
    });
};
