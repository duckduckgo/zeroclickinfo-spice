function ddg_spice_reddit(re) {    
    var query = decodeURIComponent(rq);
    var subreddit = query.match(/\/?r\/\w+/);
    var restrict_sr = false;
    var header = "reddit.com";
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
            subreddit = 'r/' + subreddit;
        }
    }
    if (restrict_sr) header += subreddit;
    query = query.replace(/^(sub)?reddit|\/?r\/\w+/gi, "");
    header += " " + query;
    re = re.data.children;
    var content = '';
    for (var i=0; i < re.length; i++) {
        result = re[i].data;
        content += "<a href='" + result.url + "'>" + result.title + "</a>";
        content += " [<a href='http://www.reddit.com" + result.permalink + "'>" + result.num_comments;
        content += (result.num_comments === 1) ? " comment</a>]" : " comments</a>]";
        content += " (" + result.domain + ", " + result.score;
        content += (result.score === 1) ? " point)" : " points)";
        content += "<br>";
        if (i == 4) break;
    }
    items = new Array();
    items[0] = new Array();
    items[0]["a"] = content;
    items[0]["h"] = header;
    items[0]["s"] = "Reddit";
    items[0]["u"] = "http://www.reddit.com/r/duckduckgo/search?q=" + query + "&restrict_sr=" + restrict_sr + "&sort=relevance";
    nra(items);
};
