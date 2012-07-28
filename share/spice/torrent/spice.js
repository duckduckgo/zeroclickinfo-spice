function search_codeStrip(html) {
    // Borrowed from searchcode plugin by boyter.
	var tmp = document.createElement("div");
	tmp.innerHTML = html;
	return tmp.textContent||tmp.innerText;
}

function ddg_spice_torrent(to) {

    // Sanity check
    if (to.items.list) {
        var query, title, url, items, content;
        query = to.title.replace("isoHunt > All > ", "");
        title = query+" (Torrents)";
        query = query.replace(/\s/g, "+");
        url = "http://isohunt.com/torrents/?ihq="+query;
        items = to.items.list;
        content = "";
        
        // Order isn't guaranteed with foreach loops
        // so use a plain for loop.
        for (var i = 0; i < items.length; i++) {
            torrentTitle = search_codeStrip(to.items.list[i].title);
            torrentTitle = (torrentTitle.length > 50) ? torrentTitle.slice(0, 50)+"..." : torrentTitle;
            torrentUrl = to.items.list[i].link;
            torrentUrl = torrentUrl.replace(query, "");
            torrentSize = to.items.list[i].size;
            torrentSeeds = (to.items.list[i].Seeds == 1) ? to.items.list[i].Seeds+" seed" : to.items.list[i].Seeds+" seeds";
            content += "<div class='torrent"
                        +i+"'><a href ='"
                        +torrentUrl+"'>"
                        +torrentTitle+" ("
                        +torrentSize+")</a> - "
                        +torrentSeeds+"</div>";
        }
        items = new Array();
        items[0] = new Array();
        items[0]["a"] = content;
        items[0]["h"] = title;
        items[0]["s"] = "ISOHunt";
        items[0]["u"] = url;
        items[0]["force_big_header"] = true;
        items[0]["force_space_after"] = true;
        
        //console.log(content);
        nra(items);
    }
}
