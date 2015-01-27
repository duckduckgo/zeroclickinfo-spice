(function (env) {
    'use strict';
    env.ddg_spice_stocks = function(api_result){

        if (!api_result || !api_result.length) {
            return Spice.failed('stocks');
        }

        var result = api_result[0];

        // url is path on their domain:
        result.url = 'http://ycharts.com' + result.url;

        // add title tag for link:
        result.urlTitle = 'View more ' + result.name + ' stock data at YCharts';

        // remove +/- from change attributes and add up/down class:
        if (result.change.charAt(0) === '+') {
            result.quoteChangeDir = 'up';
        } else if(result.change.charAt(0) === '-') {
            result.quoteChangeDir = 'down';
        } else {
            result.quoteChangeDir = 'same';
        }

        result.change = result.change.replace(/^[+|-]/,'');
        result.change_percent = result.change_percent.replace(/^[+|-]/,'');

        Spice.add({
            id: 'stocks',
            name: 'Stock',
            data: result,
            meta: {
                sourceName: 'YCharts',
                sourceUrl: result.url
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.stocks.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
