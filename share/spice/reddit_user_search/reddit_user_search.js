(function (env) {
    "use strict";
    
     env.ddg_spice_reddit_user_search = function (api_result) {
        // Check if we have data to work with.
        if(api_result.error) {
            return Spice.failed('reddit_user_search');
        }
        Spice.add({
            id: "reddit_user_search",
            name: "Social",
            data: api_result.data,
            meta: {
                itemType: api_result.data.name + " (User)",
                sourceUrl: 'http://www.reddit.com/u/' + api_result.data.name,
                sourceName: 'Reddit'
            },
            templates: {
		group: 'base',
		options: {
                    content: Spice.reddit_user_search.content,
		    moreAt: true
		}
            }   
        });
    }
}(this));

Handlebars.registerHelper("reddit_user_search_timeConverter", function(timestamp){
    "use strict";
    
  var created   = new Date(timestamp*1000);
  var months    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year      = created.getFullYear();
  var month     = months[created.getMonth()];
  var date      = created.getDate();
  var hour      = created.getUTCHours() < 10 ? '0' + created.getUTCHours() : created.getUTCHours();
  var min       = created.getUTCMinutes() < 10 ? '0' + created.getUTCMinutes() : created.getUTCMinutes(); 
  var sec       = created.getUTCSeconds() < 10 ? '0' + created.getUTCSeconds() : created.getUTCSeconds();
  var time      = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    
  return time;
});

Handlebars.registerHelper("reddit_user_search_friendly_account_age", function(timestamp){
        "use strict";
    var created     = new Date(timestamp*1000);
    var now         = new Date();
    var one_day     = 1000*60*60*24;
    var one_year    = 1000*60*60*24*365;
    
    var years       = (now.getTime()-created.getTime())/one_year;
    var wholeYears  = Math.floor(years);
    
    if(wholeYears>1){
        var result     = "redditor for " + wholeYears + " years";
    } else{
        var months     = now.getMonth() - created.getMonth() + (12 * (now.getFullYear() - created.getFullYear()));
        if(now.getDate() < created.getDate()){
            months--;
        }
        if(months>1){
            var result = "redditor for " + months + " months";
        }else{
            var days   = Math.floor((now.getTime()-created.getTime())/(one_day));
            var result = "redditor for " + days + " days";
        }
    }

    return result;
});
