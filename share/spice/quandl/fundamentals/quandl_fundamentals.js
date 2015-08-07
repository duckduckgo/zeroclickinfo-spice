(function (env) {
    'use strict';
    env.ddg_spice_quandl_fundamentals = function(api_result){

        if (!api_result || api_result.data.length < 2 ) {
            return Spice.failed('quandl_fundamentals');
        }

        // url to the data set page
        // add title tag for link:
        // get recent and previous data values
        var url = 'https://quandl.com/' + api_result.source_code + "/" + api_result.code,
            urlTitle = 'View more fundamentals data at Quandl',
            recentValue = DDG.getProperty(api_result.data,'0.1'),
            previousValue = DDG.getProperty(api_result.data,'1.1');
        
        // check we have both data values
        if (!recentValue || !previousValue) {
           return Spice.failed('quandl_fundamentals');
        }
        
        // month array to make string version of date
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		
        // adding in the previous date point date	
        var fromDate = new Date(api_result.data[1][0]);
        var fromDateString = months[fromDate.getUTCMonth()] + " " + fromDate.getUTCDate() + ", " + fromDate.getFullYear();
        api_result.from_date = fromDateString;
        
        // reformatting the current data point date (to_date)
        var toDate = new Date(api_result.to_date);
        var toDateString = months[toDate.getUTCMonth()] + " " + toDate.getUTCDate() + ", " + toDate.getFullYear();
        api_result.to_date = toDateString;
        
        // splitting title into header and subheader
        var nameSplit = api_result.name.split('-');
            api_result.header = nameSplit.shift().trim();
            api_result.subheader = nameSplit.join('-').trim();
        
        // getting rounded percentage
        var percentChange = 10000 * ((recentValue - previousValue) / Math.abs(previousValue));
        percentChange = Math.round(percentChange);
        percentChange /= 100;
        api_result.change_percent = Math.abs(percentChange);
          
        // setting style based on change
        if (percentChange > 0 || percentChange === 0) api_result.changeDirection = 'up';
        if (percentChange < 0) api_result.changeDirection = 'down';

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
        } else if (Math.abs(value) >= Math.pow(10,3)) {
            value = Math.round(value / Math.pow(10,1)) / Math.pow(10,2);
            value = "$" + value + " thousand";
        }
        
        api_result.value = value;
        
        Spice.add({
            id: 'quandl_fundamentals',
            name: 'Fundamentals',
            data: api_result,
            meta: {
                sourceName: 'Quandl',
                sourceUrl: api_result.url,
                sourceIconUrl:  DDG.get_asset_path('quandl/fundamentals','quandl32x32.png')
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

