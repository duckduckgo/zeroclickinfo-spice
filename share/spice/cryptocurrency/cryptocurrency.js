/**
* Created with DuckDuckHack.
* User: claytonspinner
* Date: 2014-12-11
* Time: 04:50 AM
* To change this template use Tools | Templates.
*/
(function (env) {
    "use strict";
    
    // Currencies that we don't have flags for.
    var currency2country_extra = {
        "ltc": true,
        "btc": true,
        "ftc": true,
        "doge": true,
        "xdr": true,
        "xof": true,
        "xpd": true,
        "xpf": true,
        "xpt": true,
        "ggp": true,
        "jep": true,
        "sar": true
    };
    
    // Some naming exceptions. For example, "gbp" doesn't map to the "gb" asset.
    // We need this hash so that we know that "gbp" will get the "uk" asset.
    var currency2country_translate = {
        'gb': 'uk'
    };
    
    // Resize the size of the outer container if the content of the inner container
    // overflows.
    function resize() {        
        var resultHeight = $(".zci--currency-result").outerHeight();
        
        if(resultHeight > 65) {
            $(".zci--currency-container").css("height", "9em");
        } else {
            $(".zci--currency-container").css("height", "5em");
        }
    }
    
    // Change the look of the mobile view if the content overflows.
    function resizeMobile() {
        var tileHeight = $(".zci--currency .tile--s").outerHeight();

        if(tileHeight > 155) {
            $(".zci--currency .tile--s").addClass("large").removeClass("small");
        } else {
            $(".zci--currency .tile--s").addClass("small").removeClass("large");
        }
    }
    
    env.ddg_spice_cryptocurrency = function(api_result){

        if (!api_result) {
            return Spice.failed('cryptocurrency');
        };
        
        var results = [],
            ticker = api_result.ticker,
            rows = api_result.rows,
            queryAmount = DDG.get_query().match(/\d+/),
            convertedAmount = 0,
            rate = "",
            inverseRate = "",
            crpytonatorURL = "",
            timestamp = "",
            timestr = "";
        
        // Remove console.log after development
        console.debug("The ticker:");
        console.debug(api_result.ticker);
        console.debug("The rows:");
        console.debug(api_result.rows);
        console.debug("The amount:");
        console.debug(queryAmount);
        
        if (typeof ticker !== 'undefined') {
            console.debug("Currency pair given: showing conversion detail");
            var base = api_result.ticker.base,
                target = api_result.ticker.target,
                price = api_result.ticker.price;
            results = api_result,
                convertedAmount = queryAmount * price,
                rate = "1 " + target + " = " + (1 / price) + " " + base,
                inverseRate = "1 " + base + " = " + price + " " + target,
                crpytonatorURL = "http://www.cryptonator.com/rates/#" + api_result.ticker.base,
                timestamp = (new Date(api_result.timestamp*1000)).toString();
                
        } else if (typeof rows !== 'undefined') {
            console.debug("Single currency given: showing items view");
            // Prepare the first item box
            var givenCurrency = {
                created: rows[0].created,
                currency_primary: rows[0].currency_primary,
                currency_secondary: rows[0].currency_primary,
                convertedAmount: 1,
                currencyName: "Placeholder"
            };
            results.push(givenCurrency);
            // Add the remaining currencies
            for (var i = 0; i < rows.length; i++) {
                var base = rows[i].currency_primary,
                    target = rows[i].currency_secondary,
                    price = rows[i].tradeprice;
                rows[i].convertedAmount = queryAmount * price,
                    rows[i].rate = "1 " + base + " = " + price + " " + target;
                results.push(rows[i]);
            }
            timestamp = rows[0].created;
            
        } else {
            return Spice.failed('cryptocurrency');
        }
        
        // Format the time and date.
        timestr = timestamp.split(/\s+/);
        var xeDate = timestr[0];
        var xeTime = timestr[1].match(/\d{2}\:\d{2}\b/);
        
        // Get the flag image.
        function currency_image(symbol) {
            symbol = symbol.toLowerCase();
            if(symbol in currency2country_extra) {
                return DDG.get_asset_path('currency', 'assets/' + (DDG.is3x ? '96' : DDG.is2x ? '64' : '32') + '/' + symbol + '.png');
            }
            
            symbol = symbol.slice(0, 2);
            symbol = symbol in currency2country_translate ? currency2country_translate[symbol] : symbol;
            return DDG.settings.region.getLargeIconURL(symbol);
        }
        
        var templateObj = {
            detail: Spice.cryptocurrency.detail,
            detail_mobile: Spice.cryptocurrency.detail_mobile,
            item: Spice.cryptocurrency.item,
            item_detail: false
        };
        
        // We need to disable the detail view when we're showing the tiles.
        if(results.length > 1) {
            templateObj.detail = false;
            templateObj.detail_mobile = false;
        }

        Spice.add({
            id: "cryptocurrency",
            name: "Cryptocurrency Conversion",
            data: results,
            meta: {
                sourceName: "cryptonator.com",
                sourceUrl: 'https://www.cryptonator.com'
            },
            normalize: function(item) {
                if (typeof ticker !== 'undefined') {
                    return {
                        fromCurrencySymbol: item.ticker.base,
                        toCurrencySymbol: item.ticker.target,
                        amount: queryAmount,
                        convertedAmount: convertedAmount,
                        rate: rate,
                        inverseRate: inverseRate,
                        cryptonatorURL: crpytonatorURL,
                        fromFlag: currency_image(item.ticker.base),
                        toFlag: currency_image(item.ticker.target),
                        currencyName: "Placeholder",
                        liveURL: "Placeholder",
                        xeTime: xeTime,
                        xeDate: xeDate
                    };
                }
                console.debug("item output: \n");
                console.debug(item);
                return {
                    fromCurrencySymbol: item.currency_primary,
                    toCurrencySymbol: item.currency_secondary,
                    amount: queryAmount,
                    convertedAmount: item.convertedAmount,
                    rate: item.rate,
                    inverseRate: inverseRate,
                    cryptonatorURL: crpytonatorURL,
                    fromFlag: currency_image(item.currency_primary),
                    toFlag: currency_image(item.currency_secondary),
                    currencyName: "Placeholder",
                    liveUrl: "Placeholder",
                    xeTime: xeTime,
                    xeDate: xeDate
                };
            },
            templates: templateObj,
            onShow: function() {
                // The desktop template depends on a JS function that manages the
                // size of the container.
                if(!is_mobile) {
                    $(window).on('load', resize);
                    $(window).resize(resize);
                } else {
                    $(window).on('load', resizeMobile);
                    $(window).resize(resizeMobile);
                }
            }
        });
    };
}(this));