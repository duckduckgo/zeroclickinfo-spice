(function (env) {
    "use strict";
    env.ddg_spice_nobel_prize = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || !api_result.prizes || api_result.prizes.length == 0) {
            return Spice.failed('nobel_prize');
        }

        function getSearchTerm() {
            var script = $('[src*="/js/spice/nobel_prize/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/nobel_prize\/([^\/]+)/)[1],
            match = decodeURIComponent(query).match(/(\d{4})?-(\w+)?/),
            year = match && match[1],
            category = match && match[2],
            searchTerm = ((category && capitalizeWord(category)) || "")
                        + " " 
                        + ((category && year && 'in ' + year) || year || "");
            
            return [searchTerm, year, category];
        }

        function getDetailTitleNames(item) {
            var names = [];
            $.each(item.laureates, function(index, laureate) {
                names.push(" " + laureate.firstname + " " + (laureate.surname || ""));
            });

            return names;
        }

        function capitalizeWord(word) {
            if (word == null || word == undefined || word == "")
                return "";

            return word[0].toUpperCase() + word.substring(1);
        }

        // Render the response
        Spice.add({
            id: "nobel_prize",

            // Customize these properties
            name: "Answer",
            data: api_result.prizes,
            meta: {
                sourceName: "nobelprize.org",
                sourceUrl: 'http://nobelprize.org/',
                itemType: 'Nobel Prizes',
                searchTerm: getSearchTerm()[0],
                snippetChars: 150
            },
            normalize: function(item) {
                var description,
                    laureates = item.laureates,
                    searchTermArray = getSearchTerm(),
                    category = item.category;
                description = laureates[0].motivation;

                return {
                    title: getDetailTitleNames(item),
                    description: description && description.replace(/"/g, '').replace('for', 'For'),
                    hasPrizeYear: searchTermArray[1],
                    hasPrizeCategory: searchTermArray[2],
                    url: "http://www.nobelprize.org/nobel_prizes/" + item.category + "/laureates/" + item.year + "/",
                    category: capitalizeWord(category)
                };
            },

            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    rating: false,
                    moreAt: true,
                    footer: Spice.nobel_prize.footer,
                },
                variants: {
                    tileSnippet: 'large',
                    tileTitle: '3line'
                }
            }
        });
    };
}(this));
