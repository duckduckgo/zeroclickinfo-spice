(function (env) {
    "use strict";
    env.ddg_spice_zanran = function(api_result) {

        if(!api_result || !api_result.results) {
            return Spice.failed('zanran');
        }

        Spice.add({
            id: "zanran",
            name: "Answer",
            data: api_result.results,
            meta: {
                sourceName: "Zanran",
                sourceUrl: api_result.more,
                itemType: 'Documents'
            },
            normalize: function(item) {
                if (!item.date || !item.short_title) {
                     return;
                }
                return {
                    description: item.short_title,
                    url: item.final_url,
                    icon: "//icons.duckduckgo.com/ip2/www.acrobat.com.ico",
                    title: item.site_name,
                    date: item.date
                };
            },
            templates: {
                group: 'icon',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.zanran.footer
                }
            }
        });
    };
}(this));
