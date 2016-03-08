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
                signal: function (){
                   var exceptions = ['irc', 'guid']
                      for each (var x in exceptions)
                        if (!DDG.get_query().search(x)){
                            return 'low';
                        }
                            return 'high';
                        }, 
                meta: {
                    sourceName: 'NASDAQ',
                    sourceUrl: url
                },
                normalize: function(data){
                    var change = data.ChangeFromPreviousClose,
                        dateObj = new Date(data.Date), // use Date constructor to handle non-standard date format: mm/dd/yy
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
                        date: moment(dateObj).format("MMM DD"),
                        time: moment(data.Time, "hh:mm:ss A").format("h:mm A"),
                        // if last close date is today, or time is 4:00 PM then markets are closed
                        // Note: API reports time is 4PM until 9AM following day
                        marketClosed: (data.Date === data.PreviousCloseDate || data.Time === "4:00:00 PM")
                    };
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.stocks.content,
                        moreAt: true,
                        moreText: { 
                            href: 'https://xignite.com', 
                            text: 'Data by Xignite' 
                        }
                    }
                }
            });
        });
    };
}(this));
