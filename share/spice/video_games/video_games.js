(function(env) {
    "use strict";
    
    env.ddg_spice_video_games = function(api_result) {
        if(!$.isPlainObject(api_result) || api_result.error !== "OK" || !$.isArray(api_result.results) || api_result.results.length === 0) {
            return Spice.failed('video_games');
        }
        var skip_words = ["video", "game", "games", "giantbomb"];
        var games = api_result.results;
        var query = api_result.query;
        Spice.add({
            id: "video_games",
            name: "Video Games",
            data: api_result.results,
            meta: {
                searchTerm: query,
                itemType: "Video Games",
                sourceUrl: "http://www.giantbomb.com/search/?q="+encodeURI(query),
                sourceName: "GiantBomb"
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    heading: item.name + '(' + release_date(item) + ')',
                    abstract: item.deck,
                    img: item.image.small_url,
                    image: item.image.small_url
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
                options: {
                    buy: Spice.video_games.buy,
                    brandAndPrice: false,
                    rating: false,
                    variant: "poster",
                    moreAt: true
                }
            }
        });
    }
    /**
     * release_date
     *
     * Find the release date for a game
     */
    function release_date(game) {
        var date_info = {
            month: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ],
            day: [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ]
        };
        var release = game.original_release_date.split(" ")[0];
        var parts = release.split("-");
        var date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date_info.day[date.getDay()] + " " + DDG.getOrdinal(date.getDate()) + " " + date_info.month[date.getMonth()] + " " + date.getFullYear();
    };

    /** 
     * age_rating
     *
     * Summarise the game's age rating
     */
    Handlebars.registerHelper("age_rating", function() {
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
})(this);