(function (env) {
    'use strict';
    env.ddg_spice_stocks = function(api_result){

        if (!api_result || api_result.Outcome !== "Success") {
            return Spice.failed('stocks');
        }

        var url = "http://www.nasdaq.com/symbol/" + api_result.Security.Symbol + "/real-time";

        DDG.require('moment.js', function(){
            Spice.add({
                id: 'stocks',
                name: 'Stock',
                data: api_result,
                meta: {
                    sourceName: 'NASDAQ',
                    sourceUrl: url,
                    attributionText: "Xignite"
                },
                normalize: function(data){
                    var change = data.ChangeFromPreviousClose,
                        changeDir;
                    moment().utcOffset(data.UTCOffset);

                    // remove +/- from change attributes and add up/down class:
                    if (change > 0 ) {
                        changeDir = 'up';
                    } else if(change < 0) {
                        changeDir = 'down';
                    } else {
                        changeDir = 'same';
                    }

                    return {
                        url: url,
                        urlTitle: 'View more ' + data.Security.Name + ' stock data at NASDAQ',
                        quote: data.Last.toFixed(2),
                        quoteChangeDir: changeDir,
                        change: change.toFixed(2),
                        change_percent: data.PercentChangeFromPreviousClose.toFixed(2),
                        date: moment(data.Date).format("MMM DD"),
                        time: moment(data.Time, "hh:mm:ss A").format("h:mm A")
                    };
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.stocks.content,
                        moreAt: false
                    }
                }
            });
        });
    };
}(this));
