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
            searchTerm = ((year && 'Year: ' + year) || "") 
                        + " " 
                        + ((category && ' Category: ' + category.toUpperCase()) || "");
            
            return [searchTerm, year, category];
        }

        function getDetailTitleNames(item) {
            var names = [];
            for (var laureate of item.laureates) {
                names.push(" " + laureate.firstname + " " + (laureate.surname || ""));
            }
            
            return names;
        }

        // Render the response
        Spice.add({
            id: "nobelprize",

            // Customize these properties
            name: "Nobel Prize",
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
                    searchTermArray = getSearchTerm();
                description = laureates[0].motivation;
        console.info(searchTermArray);
                return {
                    title: getDetailTitleNames(item),
                    description: description && description.replace(/"/g, '').replace('for', 'For'),
                    prizeYear: searchTermArray[1],
                    prizeCategory: searchTermArray[2],
                    url: "http://www.nobelprize.org/nobel_prizes/" + item.category + "/laureates/" + item.year + "/"
                };
            },

            templates: {
                item: "text_item",
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
    
    Handlebars.registerHelper('toUpperCase', function(str) {
        return str.toUpperCase();
    });
    
}(this));
