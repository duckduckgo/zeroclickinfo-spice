(function(env) {
    "use strict";
    
    var date_info = {
        month: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        day: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]
    };

    env.ddg_spice_video_games = function(api_result) {
        if(!$.isPlainObject(api_result) || api_result.error !== "OK" || !$.isArray(api_result.results) || api_result.results.length === 0) {
            return Spice.failed('video_games');
        }
        var skip_words = ["video game", "video games", "game", "games", "giantbomb"],
            games = api_result.results,
            query = api_result.query;
            
        Spice.add({
            id: "video_games",
            name: "Video Games",
            data: api_result.results,
            signal: DDG.get_query().indexOf("video game") == -1 ? "low" : "high",
            meta: {
                searchTerm: query,
                itemType: "Video Games",
                sourceUrl: "http://www.giantbomb.com/search/?q="+encodeURI(query),
                sourceName: "GiantBomb"
            },
            normalize: function(item) {
                return {
                    heading: item.name + '( Release Date: ' + release_date(item) + ')',
                    abstract: item.deck,
                    img: item.image.small_url,
                    image: item.image.small_url,
                    url: item.site_detail_url
                }; 
            },
            relevancy: {
                type: "primary",
                skip_words: skip_words,
                primary: [
                    { required: "image.small_url" },
                    { required: "original_release_date" },
                    { required: "platforms" },
                    { key: "deck" },
                    { key: "name" },
                    { key: "aliases" }
                ],
                dup: "name"
            },
            templates: {
                group: "products_simple",
                wrap_detail: false,
                item_detail: false,
                options: {
                    buy: Spice.video_games.buy,
                    variant: "poster"
                }
            }
        });
        Spice.getDOM('video_games').find('.tile__body').addClass('is-hidden');
    }

    // Find the release date for a game
    function release_date(game) {
        var release = game.original_release_date.split(" ")[0],
            parts = release.split("-"),
            date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date_info.day[date.getDay()] + " " + DDG.getOrdinal(date.getDate()) + " " + date_info.month[date.getMonth()] + " " + date.getFullYear();
    };
})(this);