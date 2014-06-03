(function(env) {

    var script = $('[src*="/js/spice/forvo/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/forvo\/([^\/]+)\/\w+/)[1];

    env.ddg_spice_forvo = function(api_result) {
        
        if (api_result.attributes.total < 1) return;

        // Display the Spice plug-in.
        Spice.add({
            id: "forvo",
            name: "Pronounciation",
            data: api_result.items,
            meta: {
                sourceName: "Forvo",
                itemType: "Words"
            },
            templates: {
                group: 'base',
                detail: false,
                wrap_detail: false,
                options: {
                    content: Spice.forvo.detail,
                },
            },
            view: 'Audio',
            model: 'Audio',
            normalize: function(item) {
                return {
                    streamURL: '/audio?u='+item.standard_pronunciation.pathmp3,
                    title: item.original
                };
            }
        });

    };


    // The sex (returned as either "m" or "f") should be expanded.
    Handlebars.registerHelper("forvo_sex", function(sex) {
        "use strict";

        if(sex === "m")
            return "Male";

        return "Female";
    });
}(this));