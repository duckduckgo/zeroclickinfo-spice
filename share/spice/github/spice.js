function ddg_spice_github(re) {    
    var query = decodeURIComponent(rq);
    query = query.replace(/^\s*github\s+/, "");

    var content = '';
    re = re.repositories;
    blah = re;
    for (i = 0; i < re.length; i++) {
        content += "<a href='" + re[i].url + "'>" + re[i].name + '</a>'
                +  ": " + re[i].description
                +  "<br>";
        //if (i == 5) break;
    }
    if (re.length == 1) {
        re = re[0];
        console.log(re);
        content += "<i>Author</i>: " + re.owner + "<br>"
                +  re.watchers + " watching<br>"
                +  "<br>";
    }

    items = new Array();
    items[0] = new Array();
    items[0]["a"] = content;
    items[0]["h"] = query + ' (github)';
    items[0]["s"] = "github";
    items[0]["u"] = "http://www.github.com";
        
    nra(items);
};
