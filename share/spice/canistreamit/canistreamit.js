function ddg_spice_canistreamit (api_result) {
    "use strict";

    var query = DDG.get_query().replace(/^(?:can\s*i?|how\s*to|where\s*(?:to|can\s+i))?\s*(?:find\s+a)?\s*(.+)$/, "$1");

    if(!api_result || api_result.length === 0 || 
        !DDG.stringsRelevant(api_result[0].title, query, ["stream", "watch", "streaming"]), 3) {
        alert("BYE!");
        return;
    }

    Spice.render({
        data             : api_result,
        header1          : api_result[0].title + " (Can I Stream.it)",
        force_big_header : true,
        source_name      : "Can I Stream.it?",
        image_url        : "/iu/?u=" + api_result[0].image,
        source_url       : api_result[0].links.shortUrl,
        template_normal  : "canistreamit",
        template_small   : "canistreamit_small",
        image_width      : 70,
        force_no_fold    : true
    });
};

Handlebars.registerHelper("createLinks", function(affiliates, options) {
    "use strict";

    var hasOwn = Object.prototype.hasOwnProperty,
        results = [];

    for(var index in affiliates) {
        if(hasOwn.call(affiliates, index) && affiliates[index].price !== "") {
            affiliates[index].friendlyName = affiliates[index].friendlyName.replace(/ Rental$/, "");
            results.push(affiliates[index]);
        }
    }

    options.hash.sep = ", ";
    options.hash.conj = " and ";
    return Handlebars.helpers.concat(results, options) + ".";
});

Handlebars.registerHelper("createMore", function(links, options) {
    "use strict";

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