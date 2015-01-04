(function (env) {
    "use strict";
    env.ddg_spice_github_languages = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('github_languages');
        }

        // Render the response
        Spice.add({
            id: "github_languages",

            // Customize these properties
            name: "GitHub Language Search",
            data: api_result.data.items,
            meta: {
                sourceName: "GitHub",
                sourceUrl: 'https://github.com'
            },
            templates:{
                group: 'text',
                detail: false,
		        item_detail: false
            },
            normalize : function(item){
                return{
                    title: item.name,
                    url: item.html_url,
                    description: item.description
                }
            }
        });
    };
}(this));
