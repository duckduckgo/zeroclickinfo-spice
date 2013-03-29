function ddg_spice_lastfm_artist_all(api_result) {
    Spice.render({
        data             : api_result,
        force_big_header : true,
        header1          : api_result.artist.name,
        source_name      : "Last.fm",
        source_url       : api_result.artist.url,
        template_normal  : "artist"
    });

    $(document).ready(function() {
        $("#expand").click(function() {
            DDG.toggle('all', 1);
            DDG.toggle('some', -1); 
            DDG.toggle('expand', -1);
        })
    });
}


Handlebars.registerHelper('snippet', function(text, method) {
    var stripTags = function(text) {
        return String(text).replace(/<\/?[^>]+>/g, '');
    };

    if(method === "some") {
        return stripTags(text).slice(0, 200);
    } else {
        return stripTags(text);
    }
});


Handlebars.registerHelper('list', function(items, options) {
    var out = "";

    for(var i = 0; i < items.length; i += 1) {
        out += options.fn(items[i]);
        if(i !== items.length - 1) {
            out += ", ";
        }
    }

    return out;
});