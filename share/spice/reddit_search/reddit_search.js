(function(env) {    
    env.ddg_spice_reddit = function(api_result) {
        "use strict";

        if(!api_result || !api_result.data || !api_result.data.children || api_result.data.children.length === 0) {
            return Spice.failed('reddit_search');
        }

        // Check if we have search results. If we do, remove items with over_18 set to true.
        var results = [];
        if(DDG.get_is_safe_search()) {
            for(var i = 0; i < api_result.data.children.length; i++) {
                if(!api_result.data.children[i].data.over_18) {
                    results.push(api_result.data.children[i]);
                }
            }
        } else {
            results = api_result.data.children;
        }

        // Check if we still have results after filtering.
        if(results.length === 0) {
            return Spice.failed('reddit_search');
        }
        
        var query = DDG.get_query();
        var subreddit = query.match(/\/?r\/\w+/);
        var restrict_sr = false;
        var header = '(Reddit)';

        if (subreddit) {
            subreddit = subreddit[0];
            restrict_sr = true;
        }

        query = query.replace(/^\s*(\/?r\/\w+|reddit|subreddit\s*\w+)\s+/, "");
        header = query + ' ' + header;

        Spice.add({
            id: "reddit_search",
            name: "Social",
            data: results,
            meta: {
                itemType: "posts",
                sourceUrl: "http://www.reddit.com/r/search/search?q=" + query,
                sourceIcon: true,
                sourceName: 'Reddit'
            },
	    normalize: function(item) {
        var timeFromNow = function() {
            var datePost = new Date(item.data.created_utc * 1000);
            var dateNow = new Date();
            var stringDate = "";
            if (datePost.getUTCFullYear() < dateNow.getUTCFullYear()) {
                var years = (dateNow.getUTCFullYear() - datePost.getUTCFullYear());
                stringDate = years + " year";
                if (years > 1) {
                    stringDate += "s";
                }
                stringDate += " ago";
            } 
            else if (datePost.getUTCMonth() < dateNow.getUTCMonth()) {
                var months = (dateNow.getUTCMonth() - datePost.getUTCMonth());
                stringDate = months + " month";
                if (months > 1) {
                    stringDate += "s";
                }
                stringDate += " ago";
            } 
            else if (datePost.getUTCDate() < dateNow.getUTCDate()) {
                var days = (dateNow.getUTCDate() - datePost.getUTCDate());
                stringDate = days + " day";
                if (days > 1) {
                    stringDate += "s";
                } 
                stringDate += " ago";
            } else {
                stringDate = "today";
            }
            return stringDate;
        }
		var a = {
		    url: "http://www.reddit.com" + item.data.permalink,
		    title: (item.data.title).replace(/&amp;/g, '&'),
            subtitle: timeFromNow() + " on " + item.data.subreddit,
            iconArrow: {
                url: DDG.get_asset_path('reddit_search','arrow_up.png')
            }
		};
		return a;
	    },
            templates: {
                group: 'text',
                options: {
		    footer: Spice.reddit_search.footer
                },
		detail: false,
		item_detail: false
            }
        });
    };
}(this));
