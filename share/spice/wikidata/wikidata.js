(function (env) {
    "use strict";

    env.ddg_spice_wikidata = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('wikidata');
        }

        Spice.add({
            id: "wikidata",
            name: "Answer",
            data: api_result.result.values,
            meta: {
                sourceName: "wikidata.org",
                sourceUrl: 'https://www.wikidata.org/wiki/' + api_result.result.item
            },
            templates: {
                group: 'media',
                item_detail: 'basic_info_detail' // group: media doesn't recognize links
            }
        });
    };

}(this));
