function ddg_spice_github(re) {    
    var query = decodeURIComponent(rq);
    query = query.replace(/^\s*github\s+/, "");
    var header = query;

    re = re.data.repositories;

    var content = '';
    for (i = 0; i < re.length; i++) {
        content += "<a href='" + re[i].url + "'>" + re[i].name + '</a>'
                +  ": " + re[i].description
                +  "<br>";
    }
    var more = "http://www.github.com/search?q=" + encodeURI(query);
    if (re.length == 1) {
        re = re[0];
        console.log(re);
        var url = re.homepage.replace(/^(?!https?:\/\/)/, "http://");
        content =  "<i>Description</i>: " + re.description + "<br>"
                +  "<i>Author</i>: " + re.owner + "<br>"
                +  "<i>Homepage</i>: " + "<a href='"
                +  url + "'>" + re.homepage.replace(/^https?:\/\/|\/$/gi, '')
                +  "</a><br>" + "<i>Activity</i>: " + re.watchers + " watching, "
                +  re.forks + "<a href='"
                +  re.url + "/network'> forks</a>, "
                +  re.open_issues + "<a href='" + re.url
                +  "/issues'> issues</a>"
                +  "<br>";
        more = re.url;
        header = re.name;
    }

    items = new Array();
    items[0] = new Array();
    items[0]["a"] = content;
    items[0]["h"] = header + ' (GitHub)';
    items[0]["s"] = "GitHub";
    items[0]["u"] = more;
    items[0]["force_big_header"] = true;
        
    nra(items);
};
