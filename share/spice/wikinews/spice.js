function ddg_spice_wikinews(ir){
    var items = new Array();
    var last = ir["query"]["categorymembers"];
    var content = "";

    content += "<ul>";
    for (var i = 0; i < last.length; i++){
        var published = new Date(last[i]['timestamp']);
        content += '<li><b>' +
            String('00'+(published.getMonth() + 1)).slice(-2) + '/' +
            String('00'+(published.getDate()     )).slice(-2) + ":</b> ";
        content += '<a href="http://en.wikinews.org/w/index.php?oldid=' + last[i]['pageid'] + '">';
        content += last[i]['title'] + "</a></li>";
    }
    content += "</ul>";

    items[0] = {
        a: content,
        h: "Wikinews",
        s: "Wikinews",
        force_big_header: 1,
        u: "http://en.wikinews.org/wiki/Main_Page"
    };

    nra(items);

}
