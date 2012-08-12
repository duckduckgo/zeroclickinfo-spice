function ddg_spice_github(re) {    
    var query = decodeURIComponent(rq);
    query = query.replace(/^\s*github\s+/, "");
    var header = query;

    re = re.data.repositories;

    var content = '<ul>';
    re.map(function(repo) {
        if (!repo.description || !repo.url) return;
        var ownerURL = repo.url.replace(/[^\/]*$/, "");
        content += '<li><a href="' + repo.url
                + '">' + repo.name + '</a>'
                +  ' (<a href="' + ownerURL
                + '">' + repo.owner + '</a>'
                + (repo.fork ? ', fork' : '') + ') - '
                + repo.description + '</li>';
    });
    content += "</ul>";
    var more = "http://www.github.com/search?q=" + encodeURI(query);
    if (re.length == 1) {
        re = re[0];
        last_pushed = Math.floor((new Date() - new Date(re.pushed) ) / (1000*60*60*24));
        var years_ago = Math.floor(last_pushed / 365);
        if (years_ago >= 1) {
            last_pushed = years_ago + " year" + (years_ago == 1 ? "" : "s") + " ago";
        } else if (last_pushed == 0) {
            last_pushed = "today";
        } else if (last_pushed == 1) {
            last_pushed = "yesterday";
        } else {
            last_pushed = last_pushed + " day" + (last_pushed == 1 ? "" : "s") + " ago";
        }
        var url = re.homepage.replace(/^(?!https?:\/\/)/, "http://");
        content =  "<i>Description</i>: " + re.description + "<br>"
                +  "<i>Author</i>: " + re.owner + "<br>"
                +  "<i>Homepage</i>: " + "<a href='"
                +  url + "'>" + re.homepage.replace(/^https?:\/\/|\/$/gi, '')
                +  "</a><br>" + "<i>Activity</i>: last updated " + last_pushed
                +  ", " + re.watchers + " watching, "
                +  re.forks + "<a href='"
                +  re.url + "/network'> forks</a> and "
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
