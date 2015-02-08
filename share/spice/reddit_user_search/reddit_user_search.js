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

Spice.registerHelper("reddit_user_search_timeConverter", function(timestamp){
    "use strict";
    
    var created   = new Date(timestamp*1000),
        months    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        year      = created.getFullYear(),
        month     = months[created.getMonth()],
        date      = created.getDate(),
        hour      = created.getUTCHours() < 10 ? '0' + created.getUTCHours() : created.getUTCHours(),
        min       = created.getUTCMinutes() < 10 ? '0' + created.getUTCMinutes() : created.getUTCMinutes(),
        sec       = created.getUTCSeconds() < 10 ? '0' + created.getUTCSeconds() : created.getUTCSeconds(),
        time      = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    
  return time;
});

Spice.registerHelper("reddit_user_search_friendly_account_age", function(timestamp){
    "use strict";
    var created     = new Date(timestamp*1000),
        now         = new Date(),
        one_day     = 1000*60*60*24,
        one_year    = 1000*60*60*24*365,
        years       = (now.getTime()-created.getTime())/one_year,
        wholeYears  = Math.floor(years);
    
    if(wholeYears>1){
        var result     = wholeYears + " years";
    } else if(wholeYears === 1){
        var result     = wholeYears + " year";
    }else{
        var months     = now.getMonth() - created.getMonth() + (12 * (now.getFullYear() - created.getFullYear()));
        if(now.getDate() < created.getDate()){
            months--;
        }
        if(months>1){
            var result = months + " months";
        }else if(months === 1){
            var result = months + " month";
        }else{
            var days   = Math.floor((now.getTime()-created.getTime())/(one_day)),
            result = days + " days";
        }
    }
    return "redditor for " + result;
});


Spice.registerHelper("reddit_user_search_addCommas", function(number){
    "use strict";
    number += '';    
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(number)) {
		number = number.replace(rgx, '$1' + ',' + '$2');
	}
	return number;
});
