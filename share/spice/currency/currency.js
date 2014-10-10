(function(env) {
    "use strict";
    
    env.ddg_spice_currency = function(api_result) {
        //do more checks
        if(!api_result || !api_result.conversion || !api_result.topConversions || !api_result.conversion.length || api_result.conversion.length === 0 || !api_result.topConversions.length || api_result.topConversions.length === 0) {
            Spice.failed('currency');
        }
        
        var results = [];
        var mainConv = api_result.conversion;
        var topCovs = api_result.topConversions;
        
        if(mainConv["from-currency-symbol"] != mainConv["to-currency-symbol"]) {
            //flag the input to get different output
            //if is pair get paris tile layout
            mainConv.isPair = true;
            results.push(mainConv);
        } else {
            //if is one input currency get single tile ouput
            mainConv.isSingle = true;
            mainConv["to-currency-symbol"] = topCovs[0]["to-currency-symbol"];
            mainConv["conversion-rate"] = topCovs[0]["conversion-rate"];
            results.push(mainConv);
            for(var i = 0; i < topCovs.length; i++) {
                results.push(topCovs[i]);
            }
        }
        
        //meta variable
        var timestr = mainConv["rate-utc-timestamp"].split(/\s+/);
        var xeDate = timestr[0];
        var xeTime = timestr[1].match(/\d{2}\:\d{2}\b/);
        var liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From=' + mainConv["from-currency-symbol"] + '&To=' + mainConv["to-currency-symbol"];
        
        var switch_template = function() {
            return((is_mobile) ? Spice.currency.currency_item_mobile : Spice.currency.currency_item);
        };
        
        var switch_alMeta = function() {
            return((mainConv.isPair) ? '' : '<a href="' + liveUrl + '">View live rates</a>');
        };
        
        var switch_sourceName = function() {
            return((mainConv.isPair) ? '' : 'XE.com');
        };
        
        Spice.add({
            id: 'currency',
            name: 'Currency',
            data: results,
            meta: {
                sourceUrl: "http://www.xe.com",
                sourceName: "xe.com"
            },
            normalize: function(item) {
                return {
                    fromCurrencySymbol: item["from-currency-symbol"],
                    toCurrencySymbol: item["to-currency-symbol"],
                    amount: item["from-amount"],
                    convertedAmount: item["converted-amount"],
                    rate: item["conversion-rate"],
                    inverseRate: item["conversion-inverse"],
                    xeUrl: 'http://www.xe.com/currencycharts/?from=' + item["from-currency-symbol"] + '&to=' + item["to-currency-symbol"],
                    fromFlag: "https://ddh5.duckduckgo.com/assets/currency/32/" + item["from-currency-symbol"].toString() + '.png',
                    toFlag: "https://ddh5.duckduckgo.com/assets/currency/32/" + item["to-currency-symbol"].toString() + '.png',
                    currencyName: item["to-currency-name"],
                    liveUrl: liveUrl,
                    xeTime: xeTime,
                    xeDate: xeDate
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: switch_template(),
                    moreAt: true
                }
            }
        });
    };
    
    //change font size if number lenght over 10
    Handlebars.registerHelper("amountFontSize", function(amount) {
        return((amount.toString().length > 10) ? 1.5 : 2);
    });

    //round top 10 currency results if number length over 10 
    Handlebars.registerHelper("amountRound", function(amount) {
        var round = Math.round(amount * 100) / 100;
        return((round.toString().length > 10) ? round.toPrecision(8) : round);
    });
}(this));