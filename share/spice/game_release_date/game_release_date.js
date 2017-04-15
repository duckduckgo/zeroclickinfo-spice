function ddg_spice_game_release_date (api_result) {
    "use strict";
    if(api_result == null || api_result.error != "OK" || !api_result.results || api_result.results.length === 0)
        return;
    var ignore = ["release", "date", "premiere", "of", "for", "when", "will", "did", "come", "out", "air", "game"];
    var games = api_result.results;
    games.filter(function(game) {
		return game.original_release_date !== null && DDG.isRelevant(game.name+" "+(game.aliases||""), ignore);
	});
	var game = DDG_bestResult(games, function(a, b) {
		return a.number_of_user_reviews > b.number_of_user_reviews ? a : b;
	});
    if(game == null)
        return;
    Spice.render({
        data             : game,
        header1          : game.name + " (Release Date)",
        source_url       : game.site_detail_url,
        source_name      : 'GiantBomb',
        spice_name       : 'game_release_date'
    });
}

Handlebars.registerHelper("release_date", function() {
    "use strict";
    var meta = {
        day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    var date = DDG.getDateFromString(this.original_release_date);
    return meta.day[date.getDay()] + " " + DDG.getOrdinal(date.getDate()) + " " + meta.month[date.getMonth()] + " " + date.getFullYear();
});
