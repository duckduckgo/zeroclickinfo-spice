(function (env) {
    "use strict";
    env.ddg_spice_coupons_sparheld_de = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('coupons_sparheld_de');
        }

        // Render the response
        Spice.add({
            id: "coupons_sparheld_de",

            // Customize these properties
            name: "Gutscheine",
            data: api_result.items,
            meta: {
                sourceName: "Sparheld.de",
                sourceUrl: 'http://www.sparheld.de/'
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    subtitle: "", 
                    description: item.date && item.date.expires ? 'Ablaufdatum: ' + new Date(item.date.expires.timestamp * 1000).toLocaleDateString() : 'Ablaufdatum: unbekannt',
                    url: 'http://www.sparheld.de/gutscheine/'+item.parent.alias+'#'+'show='+item.id,
                    image: 'http://cdn.sparheld.de/storage/shops/'+item.parent.alias+'.png' 
                };
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.coupons_sparheld_de.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
