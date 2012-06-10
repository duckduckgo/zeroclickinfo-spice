function ddg_spice_reddit(re) {    
    var query = decodeURIComponent(rq);
    var subreddit = query.match(/\/?r\/\w+/);
    var restrict_sr = false;
    var header = '(reddit)';
    if (subreddit) {
        subreddit = subreddit[0];
        restrict_sr = 'true';
    } else if (query.split(' ')[0] == 'subreddit') {
        subreddit = query.split(' ')[1];
        restrict_sr = 'true';
    }
    if (restrict_sr == 'true') {
        if (subreddit.charAt(0) != '/') {
            subreddit = '/' + subreddit;
        }
        if (subreddit.charAt(1) != 'r') {
            subreddit = '/r' + subreddit;
        }
        header = "(<a href='http://reddit.com" + subreddit
               + "'>" + subreddit + "</a>)";
    }
    query = query.replace(/^\s*(\/?r\/\w+|reddit|subreddit\s*\w+)\s+/, "");
    header = query + " " + header;
    re = re.data.children;
    var content = '';
    for (var i=0; i < re.length; i++) {
        result = re[i].data;
        content += "<a href='" + result.url + "'>" + result.title + "</a>"
                + " [<a href='http://www.reddit.com" + result.permalink
                + "'>" + result.num_comments
                + (result.num_comments === 1 ? " comment</a>]" : " comments</a>]")
                + " (" + result.domain + ", " + result.score
                + (result.score === 1 ? " point)" : " points)")
                + "<br>";
        if (i == 4) break;
    }
    items = new Array();
    items[0] = new Array();
    items[0]["a"] = content;
    items[0]["h"] = header;
    items[0]["s"] = "Reddit";
    items[0]["u"] = "http://www.reddit.com/r/";
    if (restrict_sr) {
        items[0]["u"] += subreddit.substr(3)
                      + "/search?q=" + query
                      + "&restrict_sr=true&sort=relevance";
    } else {
        items[0]["u"] += "duckduckgo/search?q=" + query
                      + "&restrict_sr=false&sort=relevance";
    }
    items[0]["force_big_header"] = true;
    items[0]["force_space_after"] = true;
    nra(items);
};
