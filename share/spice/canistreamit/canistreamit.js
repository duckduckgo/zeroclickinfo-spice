var ddg_spice_canistreamit = function(api_result) {

    if(api_result.length === 0) {
        return;
    }

    var image_proxy = "/iu/?u=";
    Spice.render({
        data              : api_result,
        header1           : api_result[0].title,
        force_big_head0er : true,
        source_name       : "Can I Stream.it?",
        image_url         : image_proxy + api_result[0].image,
        source_url        : api_result[0].links.shortUrl,
        template_normal   : "canistreamit"
    });

    // Force the image to be smaller.
    $("#zero_click_image img").attr("style", "width: 78px !important; height: 120px !important;");
};

Handlebars.registerHelper("createLinks", function(links, options) {
    var hasOwn = Object.prototype.hasOwnProperty,
        results = [];

    for(var index in links) {
        if(hasOwn.call(links, index)) {
            links[index].friendlyName = links[index].friendlyName.replace(/ Rental$/, "");
            results.push(options.fn(links[index]));
        }
    }

    var first = results.slice(0, results.length - 1);
    first = first.join(", ");

    return first + ", and " + results[results.length - 1] + ".";
});

Handlebars.registerHelper("createMore", function(links, options) {
    var results = [];

    if(links.rottentomatoes) {
        results.push(options.fn({
            url: links.rottentomatoes,
            friendlyName: "Rotten Tomatoes"
        }));
    }

    if(links.imdb) {
        results.push(options.fn({
            url: links.imdb,
            friendlyName: "IMDB"
        }));
    }

    var first = results.slice(0, results.length - 1);
    first = first.join(", ");

    return first + ", and " + results[results.length - 1] + ".";
});