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

        // Return a string saying how much time ago the post was created
        var timeFromNow = function() {

            // Convert post creation date to milliseconds and get exact time of creation
            var datePost = new Date(item.data.created * 1000);
            var dateNow = new Date();

            // Get how many milliseconds from now the post was created
            var datePostMillisec = dateNow.getTime() - datePost.getTime();

            var yearMillisec = 31540000000; // Milliseconds in a year
            var monthMillisec = 2628000000;  // Milliseconds in a month
            var dayMillisec = 86400000;  // Milliseconds in a day

            // Get how many years, months and days from now the post was created
            var yearsFromNow = datePostMillisec / yearMillisec;
            var monthsFromNow = datePostMillisec / monthMillisec;
            var daysFromNow = datePostMillisec / dayMillisec;
            var stringDate = "";

            // If the post was created more than one year ago,
            // set the returned value to the number of years in between
            if (yearsFromNow > 1) {
                var years = Math.floor(yearsFromNow);
                stringDate = years + " year";
                if (years > 1) {
                    stringDate += "s";
                }
                stringDate += " ago";
            }

            // Else, if the post was created more than one month ago,
            // set the returned value to the number of months in between
            else if (monthsFromNow > 1) {
                var months = Math.floor(monthsFromNow);
                stringDate = months + " month";
                if (months > 1) {
                    stringDate += "s";
                }
                stringDate += " ago";
            }

            // Else, if the post was created more than one day ago,
            // set the returned value to the number of days in between
            else if (daysFromNow > 1) {
                var days = Math.floor(daysFromNow);
                stringDate = days + " day";
                if (days > 1) {
                    stringDate += "s";
                }
                stringDate += " ago";
            } else {

                // Creation date of the post is equal to the current, so it has been created today
                stringDate = "today";
            }
            return stringDate;
        }
        var a = {
            url: "http://www.reddit.com" + item.data.permalink,
            title: (item.data.title).replace(/&amp;/g, '&'),
            subTitle: timeFromNow() + " on " + item.data.subreddit,
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
