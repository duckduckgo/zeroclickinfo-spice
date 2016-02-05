(function (env) {
    "use strict";

    env.ddg_spice_board_game_geek_search = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.items || !api_result.items.item) {
            return Spice.failed('board_game_geek');
        }


        var items = api_result.items.item,

            // Get the query without the trigger words.
            script = $('[src*="/js/spice/board_game_geek/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/board_game_geek\/search\/([^\/]+)/)[1];

        // because of the XML parsing, a response with 1 item gets
        // turned into an object rather than array
        if (!(items instanceof Array)) {
            items = [items];
        }

        // in some cases BGG returns FAR TOO MANY results, including expansions
        // this is especially a problem with games with fan expansions,
        // e.g. Ticket To Ride has 100+ results
        //
        // to eliminate most of the expansions, we get the earliest result by year
        // (using the numeric ID as a tiebreaker) and grab the first 25 entries only
        items.sort(function (a, b) {
            var aYear = Number(a.yearpublished && a.yearpublished.value) || 5000,
                bYear = Number(b.yearpublished && b.yearpublished.value) || 5000;

            if (aYear === bYear) {
                return Number(a.id) < Number(b.id) ? -1 : 1;
            } else {
                return aYear < bYear ? -1 : 1;
            }
        });

        items = items.slice(0, 25);

        // Render the response
        Spice.add({
            id: "board_game_geek",
            name: "Board Games",
            data: items,
            meta: {
                itemType: "Board Games",
                searchTerm: decodeURIComponent(query),
                sourceName: "BoardGameGeek",
                sourceUrl: "http://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=" + query,
                sourceIcon: true,
                rerender: ["img", "img_m", "abstract", "rating", "reviewCount", "players", "playTime", "age"]
            },
            normalize: function(item) {
                return {
                    bggId: item.id, // store id to use it in onItemShown
                    heading: item.name.value,
                    img: "",
                    img_m: "",
                    url: "http://boardgamegeek.com/boardgame/" + item.id,
                    url_review: "http://boardgamegeek.com/boardgame/" + item.id + "/reviews"
                };
            },
            onItemShown: function (item) {
                if (item.loadedDetails) {
                    return;
                }

                $.getJSON("/js/spice/board_game_geek/get_details/" + item.bggId, function (response) {
                    var responseItem = response.items.item,
                        rating = DDG.getProperty(responseItem, "statistics.ratings.average.value");

                    // the BGG rating is out of 10 so divide to get a five star rating
                    if (rating) {
                        rating /= 2;
                    }

                    item.set({
                        img_m: DDG.getProperty(responseItem, "image.text"),
                        img: DDG.getProperty(responseItem, "thumbnail.text"),
                        abstract: DDG.getProperty(responseItem, "description.text"),
                        rating: rating,
                        reviewCount: DDG.getProperty(responseItem, "statistics.ratings.usersrated.value"),
                        players: getRange(responseItem, "players"),
                        playTime: getRange(responseItem, "playtime"),
                        age: getRange(responseItem, "age")
                    });
                })

                item.loadedDetails = true;
            },
            templates: {
                group: 'products',
                options: {
                    price: false,
                    hideReviewText: true,
                    subtitle_content: Spice.board_game_geek_search.subtitle,
                    buy: Spice.board_game_geek_search.buy
                }
            }
        });
    };

    /**
     * Possible values this returns are based on
     * what the min/max values are, and whether they're defined:
     *
     * 15 (if min and max are the same)
     * 5-15 (min and max)
     * 5+ (min only)
     * <5 (max only)
     */
    function getRange(responseItem, rangeName) {
        var min = Number(DDG.getProperty(responseItem, "min" + rangeName + ".value")),
            max = Number(DDG.getProperty(responseItem, "max" + rangeName + ".value")),
            range = "";

        if (min && max) {
            if (min === max) {
                range = min;
            } else {
                range = min + "-" + max;
            }
        } else if (min) {
            range = min + "+";
        } else if (max) {
            range = "<" + max;
        }

        return range;
    }

}(this));
