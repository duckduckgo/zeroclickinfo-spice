function ddg_spice_congress(data) {
    if (data.status == "OK" && data.results.length > 0) {
        var result = data.results[0];
        var members = result.members;
        var snippet = "";
        for (var i = 0; i < members.length; i++) {
            var member = members[i];
            var name = "";
            if (member.middle_name) {
                name = member.first_name + " " + member.middle_name + " "
                    + member.last_name;
            } else {
                name = member.first_name + " " + member.last_name;
            }
            var twitter = null;
            if (member.twitter_account) {
                twitter = "@" + member.twitter_account;
            }
            snippet += "<a href=\""
                + member.times_topics_url + "\">"
                + "(" + member.party + ") "
                + name
                + "</a>";
            if (twitter) {
                snippet += " &mdash; <i><a href=\"http://www.twitter.com/"
                    + member.twitter_account + "\">" + twitter + "</a></i>" 
            }
            snippet += "<br />";
        }

        var title = "Members of " + result.state + " " + result.chamber;
        var source = "The New York Times";
        var url = "http://topics.nytimes.com/top/reference/timestopics/"
            + "organizations/c/congress/index.html";

        // Required by DuckDuckGo
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = title;
        items[0]['s'] = source;
        items[0]['u'] = url;
        nra(items);
    }
}    

