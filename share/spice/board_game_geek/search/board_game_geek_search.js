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
                rerender: ["img"]
            },
            normalize: function(item) {
                return {
                    bggId: item.id, // store id to use it in onItemShown
                    title: item.name.value,
                    image: "",
                    subtitle: item.yearpublished && item.yearpublished.value,
                    url: "http://boardgamegeek.com/boardgame/" + item.id,
                    url_review: "http://boardgamegeek.com/boardgame/" + item.id + "/reviews"
                };
            },
            onItemShown: function (item) {
                if (item.loadedDetails) {
                    return;
                }

                $.getJSON("/js/spice/board_game_geek/get_details/" + item.bggId, function (response) {
                    var responseItem = response.items.item;

                    item.set({ img: responseItem.thumbnail.text });
                })

                item.loadedDetails = true;
            },
            templates: {
                group: 'products',
                detail: null,
                options: {
                    price: false
                }
            }
        });
    };

}(this));
