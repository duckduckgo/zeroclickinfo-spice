(function (env) {
    "use strict";
    env.ddg_spice_isbn = function (api_result) {

        if (!api_result || api_result.error) { 
            return Spice.failed('isbn'); 
        }

        api_result = api_result[Object.keys(api_result)[0]]; // Strip off envelope

        Spice.add({
            id: 'isbn',
            name: 'Book',
            data: api_result,
            signal: 'high',

            meta: {
                itemType: 'Book',
                sourceName: 'Open Library',
                sourceUrl: api_result.url
            },
            
            normalize: function (item) {
                var main_title = toTitleCase(DDG.getProperty(item, "title"));
                if (DDG.getProperty(item, "authors.0.name")) {
                    main_title += "(" + item.authors[0].name +")";
                }
                return {
                    relevancy: {
                        primary: [
                            { required: 'publishers[0].name'},
                            { required: 'url'},
                            { required: 'title'}
                        ]
                    },
                    img             :   DDG.getProperty(item, "cover.medium"),
                    heading         :   main_title, 
                    publisher       :   toTitleCase(DDG.getProperty(item, "publishers.0.name")),
                    year            :   /\d{4}/.exec(DDG.getProperty(item, "publish_date")), // get only the year
                    pages           :   DDG.getProperty(item, "number_of_pages"),
                    url             :   DDG.getProperty(item, "url")
                };
            },

            templates: {
                group: 'media',
                options: {
                    subtitle_content: Spice.isbn.subtitle_content,
                    buy: Spice.isbn.buy,
                    ratingText: false
                }
            }
        });

        // modified version of https://github.com/gouch/to-title-case/blob/master/to-title-case.js
        function toTitleCase (string) {
            var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
            return string.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
            if (index > 0 && index + match.length !== title.length &&
              match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
              (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
              title.charAt(index - 1).search(/[^\s-]/) < 0) {
              return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
              return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
          });
        };

    };
}(this));
