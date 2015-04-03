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

        DDG.require('moment.js', function(){
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
                    return {
                        url: "http://www.reddit.com" + item.data.permalink,
                        title: (item.data.title).replace(/&amp;/g, '&'),
                        subTitle: moment(item.data.created * 1000).fromNow() + " on " + item.data.subreddit,
                        iconArrow: {
                            url: DDG.get_asset_path('reddit_search','arrow_up.png')
                        }
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        footer: Spice.reddit_search.footer
                    },
                    variants: {
                        tileTitle: "3line-small",
                        tileFooter: "2line"
                    },
                    detail: false,
                    item_detail: false
                }
            });
        });
    };
}(this));
