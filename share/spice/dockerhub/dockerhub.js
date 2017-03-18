(function (env) {
    "use strict";

    env.ddg_spice_dockerhub = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.results === 0) {
            return Spice.failed('dockerhub');
        }
        
        console.log(api_result.results);

        // Render the response
        Spice.add({
            id: 'dockerhub',
            name: 'Docker Images',
            data: api_result.results,
            meta: {
                sourceName: 'Docker Hub',
                sourceUrl: 'hub.docker.com',
                total: api_result.results.length
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    description: item.description,
                    url: (item.is_official ?
                          "https://hub.docker.com/_/" + item.name :
                          "https://hub.docker.com/r/" + item.name),
                    stars: item.star_count
                };
            }, 
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.dockerhub.content,
                    footer: Spice.dockerhub.footer,
                    moreAt: true
                },
                variants: {
                    tile: 'basic4'
                }
            }
        });
    };
}(this));
