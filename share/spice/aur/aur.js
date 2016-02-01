(function (env) {
    "use strict";
    env.ddg_spice_aur = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('aur');
        }
        
        // Get search query
        var script = $('[src*="/js/spice/aur/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/aur\/([^\/]+)/)[1]);

        // Render the response
        Spice.add({
            id: "aur",

            // Customize these properties
            name: "Software",
            data: api_result.results,
            meta: {
                sourceName: "aur.archlinux.org",
                sourceUrl: 'https://aur.archlinux.org/packages/?K=' + query
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
