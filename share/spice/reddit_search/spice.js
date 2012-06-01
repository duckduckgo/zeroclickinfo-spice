function ddg_spice_reddit(re) {    
    var query = decodeURIComponent(rq);
    query = query.replace(/^(sub)?reddit|\/?r\/\w+/gi, "")
    re = re.data.children;
    var content = '', subreddit = '';
    for (var i=0; i < re.length; i++) {
        result = re[i].data;
        if (i == 0) subreddit = result.subreddit;
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
    items[0]["h"] = "reddit.com/r/" + subreddit;
    items[0]["s"] = "Reddit";
    items[0]["u"] = "http://www.reddit.com/r/duckduckgo/search?q=" + query + "&restrict_sr=true&sort=relevance";
    nra(items);
};
