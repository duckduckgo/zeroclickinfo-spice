/**
* Created with DuckDuckHack.
* User: claytonspinner
* Date: 2014-12-11
* Time: 04:50 AM
* To change this template use Tools | Templates.
*/
(function (env) {
    "use strict";
    env.ddg_spice_cryptocurrency = function(api_result){

        if (!api_result) {
            return Spice.failed('cryptocurrency');
        } 
        
        Handlebars.registerHelper('json', function(context) {
             return JSON.stringify(context);
        });
        
        var api_result_wrapper = {};
        api_result_wrapper.api_result = api_result;

        Spice.add({
            id: "cryptocurrency",
            name: "Cryptocurrency Conversion",
            data: api_result_wrapper,
            meta: {
                sourceName: "cryptonator.com",
                sourceUrl: 'https://www.cryptonator.com'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.cryptocurrency.content,
                    moreAt: true
                }
            }
        });
    };
}(this));