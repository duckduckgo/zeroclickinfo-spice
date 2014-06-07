(function (env) {

env.ddg_spice_steam_specials = function(api_result) {
    if (!api_result) {
	return Spice.failed('specials');
    }
    // Extract our query        
    var script = $('[src*="/js/spice/steam/specials"]')[0];
    var source = $(script).attr('src');
    var query = decodeURIComponent(source.match(/\/js\/spice\/steam\/specials\/([^\/]+)/)[1]);
    var gameids = query.split(",");
    var results = [];
    var j = 0
    var genre = [];
    for(var i = 0; i < gameids.length; i++) {
	        if(api_result[gameids[i]].success == true) {
			results.push(api_result[gameids[i]].data.price_overview)
			results[j].url = "http://store.steampowered.com/app/"+api_result[gameids[i]].data.steam_appid;
			results[j].name = api_result[gameids[i]].data.name
			results[j].image = api_result[gameids[i]].data.header_image
			if(api_result[gameids[i]].data.metacritic) {
				results[j].metacritic = api_result[gameids[i]].data.metacritic	
			} 
			if(api_result[gameids[i]].data.genres) {
				$.each(api_result[gameids[i]].data.genres, function(index, value) {
					genre.push(value.description)
				});
				results[j].genre = genre.join(", ")
			}
			results[j].platforms = api_result[gameids[i]].data.platforms
			results[j].ss = (api_result[gameids[i]].data.screenshots).slice(0,4)
			genre = []
			j++
		}
    }
Spice.add({
            id: "specials",
            name: "Steam Specials",
            data: results,
            meta: {
                itemType: "Specials",
                sourceUrl: 'http://store.steampowered.com/search/?specials=1',
                sourceName: 'Steam'
            },
            templates: {
                group: 'base',
		detail: Spice.steam_specials.detail,
                options: {
                    content: Spice.steam_specials.content
                }
            },
        });
};
Handlebars.registerHelper('convertToDollars', function(cents) {
	var dollars = cents/100;
    	return dollars;
});

Handlebars.registerHelper('booleval', function(boolevaluate) {
	if(boolevaluate == true) {
		return "Yes" ;
	} else {
		return "No";
	}
});
Handlebars.registerHelper('coloreval', function(number) {
	if(!number) {
		return;
	} else if(number > 75) {
		return "LimeGreen";
	} else if(number > 49 && number < 75) {
		return "gold";
	} else {
		return "red";
	}
});
} (this));

