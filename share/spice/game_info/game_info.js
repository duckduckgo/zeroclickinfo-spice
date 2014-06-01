function ddg_spice_game_info(api_result) {
    "use strict";

    if(!$.isPlainObject(api_result) || api_result.error !== "OK" || !$.isArray(api_result.results) || api_result.results.length === 0) {
        return Spice.failed('game_info');
    }
    var ignore = ["video", "game", "games", "giantbomb"];
    var games = api_result.results;
    var query = DDG.get_query();
    $.each(ignore, function(ind, phrase) {
        query = query.replace(phrase, "");
    });
    query = $.trim(query);
    // filter irrelevant or incomplete games
    games = $.grep(games, function(data, ind) {
        return data.name != null && data.image !== null && data.image.thumb_url != null && (DDG.isRelevant(data.name, ignore) || (data.aliases != null && DDG.isRelevant(data.aliases, ignore)));
    });
    // sort them by the number of reviews, which is pretty much how 'controversial' they are
    games = games.sort(function(a, b) {
        return b.number_of_user_reviews - a.number_of_user_reviews;
    });
    // quit if there aren't any relevant games
    if(games.length == 0) {
        return;
    }
    Spice.add({
        data                     : api_result,
        sourceUrl               : "http://www.giantbomb.com/search/?q="+encodeURI(query),
        id               : "game_info",
        sourceName              : "GiantBomb",
        view: "Tiles",
        templates         : {
            items                : games,
            item: Spice.game_info.game_info,
            detail: Spice.game_info.game_info_details,
            // gets called in the event of a single result
            single_item_handler  : function(obj) {
                var data = obj.data.results[0];
                // set the header
                obj.header1 = data.name + " (Game Info)";
                // set the image
                obj.image_url = data.image.icon_url;
                // set the source
                obj.sourceUrl = data.site_detail_url;
            }
        }
    });
}
/**
 * release_date
 *
 * Find the release date for a game
 */
Handlebars.registerHelper("GameInfo_release_date", function() {
    "use strict";

    var date_info = {
        month: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        day: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]
    };
    var release = this.original_release_date.split(" ")[0];
    var parts = release.split("-");
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date_info.day[date.getDay()] + " " + DDG.getOrdinal(date.getDate()) + " " + date_info.month[date.getMonth()] + " " + date.getFullYear();
});
/** 
 * platform_summary
 *
 * Summarise the platforms a game is available on
 */
Handlebars.registerHelper("GameInfo_platform_summary", function(platforms, options) {
    "use strict";

    options.hash.sep = ", ";
    options.hash.conj = " and ";
    if(platforms.length > 4) {
        platforms = [platforms[0], platforms[1], platforms[2], {name: (platforms.length - 3) + " more"}]
    }
    return Handlebars.helpers.concat(platforms, options);
});

/** 
 * age_rating
 *
 * Summarise the game's age rating
 */
Handlebars.registerHelper("GameInfo_age_rating", function() {
    "use strict";

    var rating = "";
    var ratings = this.original_game_rating;
    // they are in the form PEGI: 3,...
    for(var i = 0; i < ratings.length; i++) {
        var parts = ratings[i].name.split(": ");
        if(parts.length == 2) {
            switch(parts[0]) {
                case "PEGI":
                    rating = parts[1] + (rating.length > 0 ? " / "+rating : "");
                    break;
                case "ESRB":
                    rating = (rating.length > 0 ? rating+" / " : "") + parts[1];
                    break;
                default:
            }
        }
    }
    return (rating.length == 0) ? "N/A" : rating;
});
