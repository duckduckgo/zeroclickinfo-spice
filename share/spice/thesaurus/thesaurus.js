function ddg_spice_thesaurus (api_result) {
    "use strict";

    // Get the query and the mode (trigger words)
    // The mode tells us what to return
    // e.g. you want the antonym but not the synonym
    var script = $('[src*="/js/spice/thesaurus/"]')[0],
        source = $(script).attr("src"),
        match  = source.match(/\/js\/spice\/thesaurus\/([^\/]+)\/([^\/]+)/),
        query  = match[1],
        mode   = match[2];

    var shorthand = {
        "synonyms"  : "syn",
        "synonym"   : "syn",
        "antonyms"  : "ant",
        "antonym"   : "ant",
        "related"   : "rel",
        "similar"   : "sim",
        "thesaurus" : "syn"
    };

    // Create the header.
    var header = "Thesaurus";
    if(shorthand[mode] === "syn") {
        header = "Synonyms of " + query;
    } else if(shorthand[mode] === "ant") {
        header = "Antonyms of " + query;
    } else if(shorthand[mode] === "rel") {
        header = "Related to " + query;
    } else if(shorthand[mode] === "sim") {
        header = "Similar to " + query;
    }

    // Check if the mode exists.
    var how_many = 0;
    for(var i in api_result) {
        if(api_result.hasOwnProperty(i) && (shorthand[mode] in api_result[i])) {
            how_many += 1;
        }
    }
    if(how_many === 0) {
        return;
    }

    api_result.mode = shorthand[mode];

    // Create the plugin.
    Spice.render({
        data              :  api_result,
        header1           :  header + " (Big Huge)",
        source_name       :  'Big Huge Thesaurus',
        source_url        :  'http://words.bighugelabs.com/' + query,
        template_normal   :  'thesaurus',
        force_big_header  :  true,
        force_no_favicon  :  true
    });
};

// Determine which results to show.
Handlebars.registerHelper("checkWords", function(options) {
    "use strict";

    var results = [],
        mode = this.mode;

    for(var parts_of_speech in this) {
        if(this.hasOwnProperty(parts_of_speech) && this[parts_of_speech][mode]) {
            results.push({
                heading : parts_of_speech.charAt(0).toUpperCase() + parts_of_speech.slice(1),
                words   : this[parts_of_speech][mode].splice(0, 10).join(", ")
            });
        }
    }

    return options.fn(results);
});