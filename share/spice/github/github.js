(function(env) {
    "use strict";    
    env.ddg_spice_github = function(api_result) {
        

        if (!api_result || !api_result.meta.status === 200) {
          return;
        }

        var query = DDG.get_query()
                    .replace(/^\s*github\s+/, "");

        var results = api_result.data.repositories;

        // TODO: temp size limit - relevancy block should handle this later
        if (results.length > 30)
            results = results.splice(0,30);

        sort_by_watchers(results);

        Spice.add({
            id: "github",
            name: "Software",
            data: results,
            meta: {
                itemType: "Git Repositories",
                sourceUrl: 'http://www.github.com/search?q=' +  encodeURIComponent(query),
                sourceName: 'GitHub'
            },
	    template_group: 'text',
            templates: {
		options: {
		    footer: Spice.github.footer
		}
            },
	    normalize: function(item) {
		return {
		    title: item.name,
		    subtitle: item.owner + "/" + item.name
		};
	    },
	    relevancy: {
		primary: [
		    { key: 'description', match: /.+/, strict: false } // Reject things without a description.
		]
	    }
        });
    }

    function sort_by_watchers(array){
        return array.sort(function(a, b){
             var x = a.watchers;
             var y = b.watchers;
             return ((x < y) ? 1 : ((x > y) ? -1 : 0));
         });
    }

}(this));

// Make sure we display only three items.
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
