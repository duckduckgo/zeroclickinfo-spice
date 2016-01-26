nrj("soundmanager2/script/soundmanager2-nodebug-jsmin.js", true);

function ddg_spice_forvo (api_result) {
    "use strict";

    if (!api_result) {
        return Spice.failed('forvo');
    }

    if (api_result.attributes.total < 1) return;

    var script = $('[src*="/js/spice/forvo/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/forvo\/([^\/]+)\/\w+/)[1];
    query = decodeURIComponent(query);
    
    // Display the Spice plug-in.
    Spice.add({
        id: "forvo",
        name: "Pronunciation",
        data: {
            list: api_result.items
        },
        meta:{
            sourceName: "Forvo",
            sourceUrl: "http://forvo.com/search/" + query,
        },
        templates: {
            group: 'list',
            options: {
                list_content: Spice.forvo.forvo,
                moreAt: true
            }
        },
        normalize: function(item) {
            return {
                title: 'Pronunciations of ' + query
            };
        },
    });
};

// The sex (returned as either "m" or "f") should be expanded.
Handlebars.registerHelper("forvo_sex", function(sex) {
    "use strict";

    if(sex === "m")
        return "Male";

    return "Female";
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
