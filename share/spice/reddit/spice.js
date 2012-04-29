function ddg_spice_reddit(re) {
    
    //console.log(re["data"]["url"]);
    // validity check
    if (re["data"]["display_name"]) {
        if (re["data"]["over18"] === true) {
            // It would be better if over18s showed when safe
            // search is off. How?
            return;
        }

        var content, description, title, subscribers, created, url;
        var converter = Markdown.getSanitizingConverter();
        
        // removes any html to prevent leakage.
        description = converter.makeHtml(re["data"]["description"]).replace(/\n/gm, "-").replace(/<(?:.|\n)*?>/gm, "");
        description = description.slice(0, 100).replace(/\#+/,'')+"... ";

        url = re["data"]["url"];
        title = "<a href='http://www.reddit.com" + url + "'>" + re["data"]["title"] + '</a>';
        subscribers = re["data"]["subscribers"];
        created = new Date(re["data"]["created"]*1000); // Shown in user's local time.
        content = "<div class='subreddit_title'><i>Title: </i> " + title  + "</div>";
        content += "<div class='subreddit_description'><i>Description</i>: " + description + "</div>";
        content += "<div class='subreddit_subscribers'><i>Subscribers</i>: " + subscribers + "</div>";
        content += "<div class='subreddit_created'><i>Created</i>: " + created + "</div>";
        
        items = new Array();
        items[0] = new Array();
        items[0]["a"] = content  ;
        items[0]["h"] = url;
        items[0]["s"] = "Reddit";
        items[0]["u"] = "http://www.reddit.com" + url;
        items[0]['f'] = 1;
        items[0]["i"] = re["data"]["header_img"];

        //console.log(content);
    }
        
};

function link_parse(li) {
    if (typeof items == 'undefined') {
        return; // The subreddit is NSFW.
    }
    if (li['data']['children'][0]) {
        //console.log(root["title"]);
        var root = li['data']['children'][0].data;
        var content, title, url, permalink, score, author, date;
        title = root['title'];
        url = root['url'];
        permalink = root['permalink'];
        score = root['score'];
        author = root['author'];
        date = root['date'];

        if (root['over_18'] === true) {
            title += " (NSFW)";
        }

        content = "<div class='subreddit_link'><i>Popular Link:</i> ";
        content += "<a href='"+url+"'>"+title+"</a>"+" by <a href='http://www.reddit.com/user/"+author+"'>\
"+author+"</a> with "+score+" karma. ";
        content += "(<a href='http://www.reddit.com"+permalink+"'>Discuss</a>)</div>";

        items[0]["a"] += content;

    }

    nra(items);

};