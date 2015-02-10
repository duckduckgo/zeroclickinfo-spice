(function (env) {
    "use strict";
    env.ddg_spice_chefio = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('chefio');
        }

        Spice.add({
            id: "chefio",
            name: "software",
            data: api_result.items,
            meta: {
                sourceName: "Chef.io",
                sourceUrl: "http://chef.io"
            },
            normalize: function(item) {
                var a = {
                    url: "https://supermarket.chef.io/cookbooks/" + item.cookbook_name,
                    subtitle: item.cookbook_description,
                    title: item.cookbook_name
                }
                
                return a;
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: false,
                    footer: Spice.chefio.footer
                },
                detail: false,
                item_detail: false
            }
        });
    };
}(this));
