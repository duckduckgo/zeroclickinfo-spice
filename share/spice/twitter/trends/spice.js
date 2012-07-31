function ddg_spice_twitter_trends(data) {
    if (data[0]){
        var trends = data[0].trends;
        
        var snippet = d.createElement("div");
        var list = d.createElement("ul");
        list.class = "twitter_trends";

        for (var i=0; i < trends.length; i++) {
            var trend = trends[i];
            var item = d.createElement("li");
            item.class = "trend";

            var anchor = d.createElement("a");
            anchor.href = trend.url;
            anchor.innerHTML = trend.name;
            
            item.appendChild(anchor);
            list.appendChild(item);
        }
        
        snippet.appendChild(list);

        var items = [[]];
        items[0]['a'] = snippet.innerHTML;
        items[0]['h'] = "Trending in " + trends[0].name;
        items[0]['s'] = "Twitter";
        items[0]['u'] = "http://twitter.com";
        nra(items, 1, 1);
    }
}