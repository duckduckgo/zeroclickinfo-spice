(function (env) {
    "use strict";
    env.ddg_spice_github_languages = function(api_result){

        if (!api_result || !api_result.meta.status === 200) {
          return Spice.failed('github');
        }

        // There's a next linkpage link provided by the api, this converts it
        // to a link to the next page on the actual github search, so by clicking
        // More on Github you automatically get taken to the next page of results
        if (api_result.meta.Link) {
            var sourceUrl = api_result.meta.Link[0][0].
                replace(/api.github.com\/search\/repositories/, "github.com/search").
                replace("&callback=ddg_spice_github_languages", "").
                replace("&page=2", "&p=2");
        } else {
            // Github doesn't include that Link tag if there's only a single page of results.
            // I don't see a way to grab the query at all, so just send them to GitHub.
            var sourceUrl = "https://github.com/"
        }
        

        // Render the response
        Spice.add({
            id: "github_languages",

            // Customize these properties
            name: "GitHub Language Search",
            data: api_result.data.items,
            meta: {
                sourceName: "GitHub",
                sourceUrl: sourceUrl
            },
            templates:{
                group: 'text',
                detail: false,
		        item_detail: false,
                options: {
                        footer: Spice.github_languages.footer
                    }
            },
            normalize : function(item){
                return{
                    title: item.name,
                    subtitle: item.full_name,
                    url: item.html_url,
                    description: item.description
                }
            }
        });
    };
}(this));

// I grabbed this from the GitHub Spice, as well as the css and footer files
// in an attempt to try and have consistency for GitHub related results. The
// GitHub Spice was written by Dylan Lloyd.
Handlebars.registerHelper("GitHub_last_pushed", function(pushed) {
    "use strict";

    var last_pushed = Math.floor((new Date() - new Date(pushed)) / (1000*60*60*24));

    var years_ago = Math.floor(last_pushed / 365);
    if (years_ago >= 1) {
        last_pushed = years_ago + " year" + (years_ago == 1 ? "" : "s") + " ago";
    } else if (last_pushed == 0) {
        last_pushed = "today";
    } else if (last_pushed == 1) {
        last_pushed = "yesterday";
    } else {
        last_pushed = last_pushed + " day" + (last_pushed == 1 ? "" : "s") + " ago";
    }

    return last_pushed;
});
