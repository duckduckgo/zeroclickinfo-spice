(function(env) {
    "use strict";

    // Prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript.
    // If cache was set to false, it would be calling /js/spice/hackage/packages/hello?_=12345
    // and that's something that we don't want.
    $.ajaxSetup({ cache: true });

    // Fetch our json and pass to getScript
    var queryexec
    env.ddg_spice_steam_specials = function(api_result) {
        if(!api_result) {
            return Spice.failed('specials');  
        }
        var idarray = api_result.tabs.viewall.items;
        queryexec = encodeURIComponent(($.map(idarray,function(elem){return elem.id;}).join(",")));
        $.getScript("/js/spice/steam/list_specials/" + queryexec);
    };

    
    env.ddg_spice_steam_list_specials = function(api_result) {
        if (!api_result) {
            return Spice.failed('specials');
        }
        
        if(!queryexec) {
            return Spice.failed('specials');
        }
   
        var query = decodeURIComponent(queryexec);
    	
        // Extract our query
        var gameids = query.split(",");
        var results = [];
        var j = 0;
        var genre = [];

        // Organize data to display
        for(var i = 0; i < gameids.length; i++) {
            if(api_result[gameids[i]].success == true) { //successfully fetched information on game
                results.push(api_result[gameids[i]].data.price_overview);
                results[j].url = "http://store.steampowered.com/app/"+api_result[gameids[i]].data.steam_appid;
                results[j].name = api_result[gameids[i]].data.name;
                results[j].image = api_result[gameids[i]].data.header_image;
                if(api_result[gameids[i]].data.metacritic) {
                    results[j].metacritic = api_result[gameids[i]].data.metacritic;
                } 
                if(api_result[gameids[i]].data.genres) {
                    $.each(api_result[gameids[i]].data.genres, function(index, value) {
                        genre.push(value.description);
                    });
                    results[j].genre = genre.join(", ");
                }
                results[j].platforms = api_result[gameids[i]].data.platforms;
                results[j].ss = (api_result[gameids[i]].data.screenshots).slice(0,4);
                genre = [];
                j++;
        }
    }

    if(!results) {
        return Spice.failed('specials');
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
}(this));
