(function (env) {
    "use strict";
    env.ddg_spice_aur = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('aur');
        }

        // Render the response
        Spice.add({
            id: "aur",

            // Customize these properties
            name: "Software",
            data: api_result.results,
            meta: {
                sourceName: "aur.archlinux.org",
                sourceUrl: 'http://aur.archlinux.org/rpc.php?type=search&arg=' + api_result.name
            },
            normalize: function(item) {
                return {
                    url: "https://aur.archlinux.org/packages/" + item.Name + "/",
                    title: item.Name,
                    description: item.Description,
                    subtitle: "Version: " + item.Version,
                    iconArrow: {
                            url: DDG.get_asset_path('aur','arrow_up.png')
                    }
                };          
            },
  
            templates: {
                group: 'text',
                options: {
                    footer: Spice.aur.footer,
                },
                variants: {
                tile: 'basic4'
                },
                detail: false,
                item_detail: false
            }
        });
    };
}(this));
