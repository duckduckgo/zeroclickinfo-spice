function ddg_spice_wikinews(ir){
    var items = new Array();
    var last = ir["query"]["categorymembers"];
    var content = "";

    content += "<ul>";
    for (var i = 0; i < last.length; i++)
        content += '<li><a href="http://en.wikinews.org/w/index.php?oldid=' + last[i]['pageid'] + '">' +
        last[i]['title'] + "</a></li>";
    content += "</ul>";

    items[0] = {
        a: content,
        h: "News",
        s: "Wikinews",
        force_big_header: 1,
        u: "http://en.wikinews.org/wiki/Main_Page"
    };

    nra(items);

}
