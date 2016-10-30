(function (env) {
    "use strict";

    env.ddg_spice_translate = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.err) {
            return Spice.failed('translate');
        }
        
        console.log(api_result);
        
        let response = JSON.parse(decodeURI(api_result.replace(/\,\,/g, ',').replace(/\,\,/g, ',')));
        let translation = [];
        for(var i = 0; i < response[0].length; i++) {
          translation.push(response[0][i][0]);
        }
        let originLang = decodeURI(response[1].toUpperCase());

        // Render the response
        Spice.add({
            id: 'translate',

            // Customize these properties
            name: `Translate`,
            data: api_result,
            meta: {
                sourceName: 'Google Translate',
                sourceUrl: 'https://translate.google.com'
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: `Translate ${originLang} to English`,
                    translation: translation.join(' '),
                    icon: 'https://icons.duckduckgo.com/ip2/translate.google.com.ico'
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.translate.content,
                    moreAt: true
                }
            }
        });
    };
}(this));

// (function (env) {
//     "use strict";
//     env.ddg_spice_quote_of_the_day = function(api_result) {

//         if (!api_result || api_result.error) {
//             return Spice.failed('quote_of_the_day');
//         }

//         Spice.add({
//             id: "quote_of_the_day",
//             signal:"high",
//             name: "Quote of the Day",
//             data: api_result,
//             meta: {
//                 sourceName: "They Said So",
//                 sourceUrl: "https://theysaidso.com/quote/"+api_result.contents.quotes[0].id
//             },
//             normalize: function(item) {
//                 return {
//                     quote : item.contents.quotes[0].quote,
//                     person: item.contents.quotes[0].author,
//                     len : parseInt(item.contents.quotes[0].length) + item.contents.quotes[0].author.length
//                 };
//             },
//             templates: {
//                 group: 'base',
//                 options: {
//                     content: Spice.quote_of_the_day.content,
//                     moreAt: true
//                 }
//             }
//         });
//     };
// }(this));

