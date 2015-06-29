(function (env) {
    "use strict";
    env.ddg_spice_crunchbase = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('crunchbase');
        }
        var metadata = api_result.metadata;
        var data = api_result.data;
	var items = data.items;
	var wwwPathPrefix = metadata.www_path_prefix;
        var imagePathPrefix = metadata.image_path_prefix;

        // Render the response
        Spice.add({
            id: "crunchbase",
            name: "Crunchbase Organizations",
            data: api_result.data.items,
            meta: {
                sourceName: "Crunchbase",
                sourceUrl: api_result.metadata.www_path_prefix
            },
            normalize: function(item) {
                return {
                   // description: DDG.strip_html(item.ShortDescription),
                    url: wwwPathPrefix + item.path,
                    //icon: DDG.strip_html(DDG.strip_href(imagePathPrefix) + DDG.strip_href(item.path)),
                    title: item.name
                };
            },
            templates: {
                group: 'icon',
                detail: false,
                item_detail: false
            }
        });
    };
}(this));
