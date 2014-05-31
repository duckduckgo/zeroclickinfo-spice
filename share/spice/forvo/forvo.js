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
                sourceUrl: "http://www.forvo.com/search/" + query,
                sourceName: "Forvo",
                itemType: "Words"
            },
            templates: {
                item_custon: 'audio_item'
            },
            view: 'Audio',
            model: 'Audio',
            normalize: function(item) {
                return {
                    streamURL: '/audio?u='+item.standard_pronunciation.pathogg,
                    title: item.original,
                    // placeholder image
                    image: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/140.jpg',
                    url: "http://www.forvo.com/search/" + query
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