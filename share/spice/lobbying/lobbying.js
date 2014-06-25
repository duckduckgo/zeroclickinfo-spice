(function(env) {
    "use strict";
    env.ddg_spice_lobbying = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return;
        }

        // Number of results to display
        var displayResults = 10;

        // to hold the data sorted in decending order
        var sorted_results = [];

        // get the query to display in the IA header
        var script = $('[src*="/js/spice/lobbying"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/lobbying\/([^\/]+)/)[1];
        query = decodeURIComponent(query);

        /* get rid of entries in the api results that don't contain
    an amount given or received. Push to the sorted_result
    array */
        for(var e in api_result){
            if(!api_result.hasOwnProperty(e)){
                continue;
            }
            if((api_result[e].total_given || api_result[e].total_received)){
                sorted_results.push(api_result[e]);
            }
        }

        // sort by the sum of amounts given and received
        sorted_results = sortTotal(sorted_results);

        // convert to currency format, comma separated without dollar sign
        for(var e in sorted_results){
            sorted_results[e].total_given = toCurrency(sorted_results[e].total_given);
            sorted_results[e].total_received = toCurrency(sorted_results[e].total_received);
            sorted_results[e].non_firm_spending = toCurrency(sorted_results[e].non_firm_spending);
        }

        var return_results = [];
        for (var i = 0; i < displayResults; ++i){
            return_results[sorted_results[i].name] = {
                'given': amtGiven(sorted_results[i]),
                'received': amtLobby(sorted_results[i])
            }
        }

        Spice.add({
            id: 'Lobbying',
            name: 'Lobbying',
            data: [sorted_results],
            meta: {
                sourceName: 'Influence Explorer',
                sourceUrl: "http://influenceexplorer.com/search?query=" + query,
                itemType: "contributions"
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.lobbying.detail,
                    moreAt: true
                }
            }
        });

    /**** helper functions *******/

        // Return the spent on lobbying
Handlebars.registerHelper('lobbying_', function(e){
            return (e.non_firm_spending ? '$' + e.non_firm_spending : '&ndash;');
        }

        // Return the amount given
Handlebars.registerHelper('lobbying_given', function(e){
            return (e.total_given ? '$' + e.total_given : '&ndash;');
        }

        // Return the amount given
Handlebars.registerHelper('lobbying_received' function(e){
            return (e.total_received ? '$' + e.total_received : '&ndash;');
        }

        // convert from whole number to currency format
        // i.e. 1000.00 to 1,000
        function toCurrency(num){
            if(num == 0){
                return null;
            }

            var currencyNum = '';
            var wholeNum = num.toFixed(0).split('');
            var digits = wholeNum.length;
            var reverseNum = num.toFixed(0).split('').reverse().join('');

            // loop though the reversed number and add a comma at i%3
            // this gives a reversed but comma separated number
            for(var i = 0; i < digits; i++){
                if((i%3 == 0) && (i!=0)){
                    currencyNum += ','+ reverseNum[i]
                } else {
                    currencyNum += reverseNum[i];
                }
            }
            // reverse the number and return it
            return currencyNum.split('').reverse().join('');
        }

        // sort results in decending order using the sum of total
        // amounts given and received
        function sortTotal(array){
            return array.sort(function(a, b){
                var x = a.total_received + a.total_given + a.non_firm_spending;
                var y = b.total_received + b.total_given + b.non_firm_spending;
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
    }
}(this));