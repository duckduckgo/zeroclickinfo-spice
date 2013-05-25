var ddg_spice_canistreamit = function(api_result) {

    if(api_result.length === 0) {
        return;
    }

    var image_proxy = "/iu/?u=";
    Spice.render({
        data              : api_result,
        header1           : api_result[0].title,
        force_big_header  : true,
        source_name       : "Can I Stream.it?",
        image_url         : image_proxy + api_result[0].image,
        source_url        : api_result[0].links.shortUrl,
        template_normal   : "canistreamit"
    });

    // Force the image to be smaller.
    $("#zero_click_image img").attr("style", "width: 78px !important; height: 120px !important;");
};

Handlebars.registerHelper("createLinks", function(affiliates, options) {
    var hasOwn = Object.prototype.hasOwnProperty,
        results = [];

    for(var index in affiliates) {
        if(hasOwn.call(affiliates, index)) {
            affiliates[index].friendlyName = affiliates[index].friendlyName.replace(/ Rental$/, "");
            results.push(affiliates[index]);
        }
    }

    options.hash.sep = ", ";
    options.hash.conj = " and ";
    return Handlebars.helpers.concat(results, options) + ".";
});

Handlebars.registerHelper("createMore", function(links, options) {
    var results = [];

    if(links.rottentomatoes) {
        results.push({
            url: links.rottentomatoes,
            friendlyName: "Rotten Tomatoes"
        });
    }

    if(links.imdb) {
        results.push({
            url: links.imdb,
            friendlyName: "IMDB"
        });
    }

    options.hash.sep = ", ";
    options.hash.conj = " and ";
    return Handlebars.helpers.concat(results, options) + ".";
});