function ddg_spice_trends(data) {
    if (data && data.query.count > 0) {
        var woeid = data.query.results.place[0].woeid
        if (woeid) {
            var script = document.createElement('script');
            script.src = "http://api.twitter.com/1/trends/"
                + woeid
                + ".json?callback=parse";
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}

function parse(data) {
    var trends = data[0];
    t = trends;

    var title = "Trending in " + trends.locations[0].name;
    var source = "Twitter";
    var url = "http://twitter.com/";

    var snippet = "<ul class=\"twitter_trends\">\n";
    for (var i = 0; i < trends.trends.length; i++) {
        var trend = trends.trends[i];
        snippet += "<li class=\"trend\">\n"
            + "<a href=\"" + trend.url + "\">" + trend.name + "</a>\n"
            + "</li>\n";
    }
    snippet += "</ul>\n"
        + "<style type=\"text/css\">\n"
        + "ul.twitter_trends {\n"
        + "    padding-left: 0;\n"
        + "}\n"
        + "li.trend {\n"
        + "    display: inline;\n"
        + "    margin: 0;\n"
        + "    padding-right: 5px;\n"
        + "    list-style-type: none;\n"
        + "}\n"
        + "</style>\n";

    // Required by DuckDuckGo
    var items = new Array();
    items[0] = new Array();
    items[0]['a'] = snippet;
    items[0]['h'] = title;
    items[0]['s'] = source;
    items[0]['u'] = url;
    nra(items);
}

