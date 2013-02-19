function ddg_spice_twitter_locate(data) {
    if (data && data.query.count > 0) {
        
        var results = data.query.results;

        if (results.place[0]) {
            var woeid = data.query.results.place[0].woeid;
        } else {
            var woeid = data.query.results.place.woeid;
        }

        if (woeid) {
    		nrj("/js/spice/twitter/trends/" + woeid);
    	}
    }
}

function ddg_spice_twitter_trends(data) {
    if (data[0]){
        var trends = data[0].trends;
        var snippet = d.createElement("div");
        var list = d.createElement("ul");
        YAHOO.util.Dom.addClass(list, 'twitter_trends');

        for (var i=0; i < trends.length; i++) {
            var trend = trends[i];
            var item = d.createElement("li");
            YAHOO.util.Dom.addClass(item, 'trend');

            var anchor = d.createElement("a");
            anchor.href = trend.url;
            anchor.innerHTML = trend.name;
            
            item.appendChild(anchor);
            list.appendChild(item);
        }
        
        snippet.appendChild(list);

        var items = [[]];
        items[0]['a'] = snippet.innerHTML;
        items[0]['h'] = "Trending in " + data[0].locations[0].name + " (Twitter)";
        items[0]['s'] = "Twitter";
        items[0]['u'] = "http://twitter.com";
        items[0]['force_no_fold'] = 1;
        nra(items, 1, 1);
    }
}