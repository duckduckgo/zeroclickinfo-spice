/**
* Created with DuckDuckHack.
* User: brianrisk
* Date: 2015-02-12
* Time: 04:37 PM
* To change this template use Tools | Templates.
*/


(function (env) {
    'use strict';
    env.ddg_spice_quandl_fundamentals = function(api_result){

        if (!api_result) {
            return Spice.failed('quandl_fundamentals: no results');
        }

        var result = api_result;
        
        // we need two data points to get percent change
        if (result.data.length < 2) {
            return Spice.failed('quandl_fundamentals: not enough data points');
        }

        // url is path on their domain:
        result.url = 'https://quandl.com/SF1';

        // add title tag for link:
        result.urlTitle = 'View more fundamentals data at Quandl';
        
        var recentValue = result.data[0][1];
        var previousValue = result.data[1][1];
        
        // adding in the previous date point date
        result.from_date = result.data[1][0];
        
        // getting rounded percentage
        var percentChange = 10000 * ((recentValue - previousValue) / Math.abs(previousValue));
        percentChange = Math.round(percentChange);
        percentChange /= 100;
        result.change_percent = percentChange;
          
        // setting style based on change
        if (percentChange > 0) result.changeDirection = 'up';
        if (percentChange < 0) result.changeDirection = 'down';
        if (percentChange == 0) result.changeDirection = 'same';

        // the most recent fundamental value
        var value = recentValue;
        if (Math.abs(value) >= Math.pow(10,12)) {
            value = Math.round(value / Math.pow(10,10)) / Math.pow(10,2);
            value = "$" + value + " trillion";
        } else if (Math.abs(value) >= Math.pow(10,9)) {
            value = Math.round(value / Math.pow(10,7)) / Math.pow(10,2);
            value = "$" + value + " billion";
        } else if (Math.abs(value) >= Math.pow(10,6)) {
            value = Math.round(value / Math.pow(10,4)) / Math.pow(10,2);
            value = "$" + value + " million";
        }
        result.value = value;
        

        Spice.add({
            id: 'Quandl_fundamentals',
            name: 'Fundamentals',
            data: result,
            meta: {
                sourceName: 'Quandl',
                sourceUrl: result.url,
                sourceIconUrl: DDG.get_asset_path('quandl_fundamentals','quandl32x32.png')
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.quandl_fundamentals.content,
                    moreAt: true
                }
            }
        });
    };
}(this));

