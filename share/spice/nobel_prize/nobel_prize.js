(function (env) {
    "use strict";
    env.ddg_spice_nobel_prize = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || !api_result.prizes || api_result.prizes.length == 0) {
            return Spice.failed('NobelPrize');
        }

        function getURLSurname(surname) {
            surname = surname.toLowerCase();
            surname = surname.replace(/(?!-)[\W]/g, '');   
            return surname;
        }

        function getSubtitle(laureates) {
            var numLaureates = laureates.length,
                subtitle = '';
            
            if (numLaureates > 1) {
                    subtitle = "Shared with " + laureates[1].firstname;
                    subtitle += (numLaureates == 2 ? "." : " and " + (numLaureates - 2) + " more.");
                } else 
                    subtitle = "Shared by none.";
            
            return subtitle;
        }

        function getSearchTerm() {
            var script = $('[src*="/js/spice/nobel_prize/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/nobel_prize\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query),
            year = decodedQuery.match(/(\d{4})/) && decodedQuery.match(/(\d{4})/)[1],
            category = decodedQuery.match(/(physics|chemistry|medicine|peace|literature|economics)/) 
                        && decodedQuery.match(/(physics|chemistry|medicine|peace|literature|economics)/)[1],
            searchTerm = ((year && 'Year: ' + year) || "") + ((category && ' Category: ' + category.toUpperCase()) || "");
            
            return searchTerm;
        }

        function getImageURL(item) {
            if (item.laureates[0].surname) {
                return  "http://www.nobelprize.org/nobel_prizes/"
                        + item.category + "/laureates/" 
                        + item.year + "/" 
                        + getURLSurname(item.laureates[0].surname) + ".jpg";    
            }
        }

        function getDetailTitleNames(item) {
            var names = [];
            for (var laureate of item.laureates) {
                names.push(laureate.firstname + " " + (laureate.surname || ""));
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
                searchTerm: getSearchTerm()
            },
            normalize: function(item) {
                var title, description, imageURL,
                    laureates = item.laureates;
                
                imageURL = getImageURL(item);
                title = laureates[0].firstname + " " + (laureates[0].surname || "");
                description = laureates[0].motivation;

                return {
                    title: title,
                    icon: imageURL,
                    altSubtitle: getSubtitle(laureates),
                    description: description,
                    year: item.year,
                    category: item.category.toUpperCase(),
                    detail_title_names: getDetailTitleNames(item)
                };
            },
    
            onItemShown: function(item) {
                var laureate_info = {}, laureates = [];
                laureate_info['overallMotivation'] = item.overallMotivation;

                for(var laureate of item.laureates) {
                    $.getJSON('http://api.nobelprize.org/v1/laureate.json?&id=' + laureate.id, function(laureate) {
                        laureate = laureate.laureates[0];

                        var prize;
                        for(var p of laureate.prizes) {
                            if (item.year == p.year)
                                prize = p;
                        }

                        laureates.push({
                            bornOn: laureate.born == "0000-00-00" ? 0 : (new Date(laureate.born).toDateString()),
                            bornCity: laureate.bornCity,
                            bornCountry: laureate.bornCountry,
                            diedOn: laureate.died == "0000-00-00" ? 0 : (new Date(laureate.died).toDateString()),
                            name: laureate.firstname + " " + (laureate.surname || ""),
                            share: prize.share,
                            motivation: prize.motivation
                        });
                    });
                 }

                laureate_info['laureates'] = laureates;
                item.set({laureate_info: laureate_info})
            },

            templates: {
                group: 'text',
                options: {
                    rating: false,
                    moreAt: false,
                    description: false,
                    footer: Spice.nobel_prize.footer,
                    title_content: Spice.nobel_prize.title_content,
                    subtitle_content: Spice.nobel_prize.footer,
                    content: Spice.nobel_prize.content
                },
                variants: {
                    tileSnippet: 'large',
                    tileSubtitle: '2line',
                    tileTitle: '2line-large'
                }
            }
        });
    };
}(this));
