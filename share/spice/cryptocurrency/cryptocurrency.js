(function (env) {
    "use strict";
    
    // Currencies that we have flags for.
    var currency2country_extra = {
        "aud": true,
        "cny": true,
        "eur": true,
        "gbp": true,
        "hkd": true,
        "jpy": true,
        "nzd": true,
        "pln": true,
        "rur": true,
        "sgd": true,
        "usd": true
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
            timestamp = "",
            timestr = "",
            cryptoDate = "",
            cryptoTime = "";
        
        // If no amount was given in the query default to 1.
        if (queryAmount === null) {
            queryAmount = 1;
        };
        
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
                price = parseFloat(api_result.ticker.price);
            results = api_result,
                convertedAmount = queryAmount * price,
                rate = "1 " + target + " = " + formatNumber((1 / price), 6) + " " + base,
                inverseRate = "1 " + base + " = " + formatNumber(price, 6) + " " + target,
                timestamp = (new Date(api_result.timestamp*1000)).toISOString(),
                timestr = timestamp.split(/T+/);
                cryptoDate = timestr[0];
                cryptoTime = timestr[1].match(/\d{2}\:\d{2}\b/);
            console.debug(timestamp);
                
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
                    price = parseFloat(rows[i].tradeprice);
                rows[i].convertedAmount = queryAmount * price,
                    rows[i].rate = "1 " + base + " = " + formatNumber(price, 6) + " " + target;
                results.push(rows[i]);
            }
            timestamp = rows[0].created;
            // Format the time and date.
            timestr = timestamp.split(/\s+/);
            cryptoDate = timestr[0];
            cryptoTime = timestr[1].match(/\d{2}\:\d{2}\b/);
            
        } else {
            return Spice.failed('cryptocurrency');
        }
        
        
        
        // Get the flag image.
        function currency_image(symbol) {
            symbol = symbol.toLowerCase();
            // Most cryptocurrencies will NOT have flags associated with countries
            // They will need to have their own flag provided for them.
            if(!(symbol in currency2country_extra)) {
                return DDG.get_asset_path('cryptocurrency', 'assets/' + (DDG.is3x ? '96' : DDG.is2x ? '64' : '32') + '/' + symbol + '.png');
            }
            
            symbol = symbol.slice(0, 2);
            symbol = symbol in currency2country_translate ? currency2country_translate[symbol] : symbol;
            return DDG.settings.region.getLargeIconURL(symbol);
        }
        
        // Add commas to the numbers for display.
        function formatNumber(x, decimalPlaces) {
            
            
            // Check if the number has a decimal point.
            // If it does, only show the first two digits after the decimal place.
            if(/\./.test(x.toString())) {
                x = x.toFixed(decimalPlaces);   
            }
        
            return DDG.commifyNumber(x);
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
            name: "Cryptocurrency",
            data: results,
            meta: {
                sourceUrl: 'https://www.cryptonator.com',
                sourceName: "cryptonator.com",
                sourceIconUrl: "http://www.cryptonator.com/ui/img/favicon.png",
                itemType: "Conversions"
            },
            normalize: function(item) {
                if (typeof ticker !== 'undefined') {
                    return {
                        fromCurrencySymbol: item.ticker.base,
                        toCurrencySymbol: item.ticker.target,
                        amount: formatNumber(queryAmount, 2),
                        convertedAmount: formatNumber(convertedAmount, 2),
                        rate: rate,
                        inverseRate: inverseRate,
                        cryptonatorURL: "http://www.cryptonator.com/rates#" + item.ticker.base,
                        fromFlag: currency_image(item.ticker.base),
                        toFlag: currency_image(item.ticker.target),
                        currencyName: "Placeholder",
                        liveURL: "Placeholder",
                        cryptoTime: cryptoTime,
                        cryptoDate: cryptoDate
                    };
                }
                return {
                    fromCurrencySymbol: item.currency_primary,
                    toCurrencySymbol: item.currency_secondary,
                    amount: formatNumber(queryAmount, 2),
                    // If item is the queried currency, then display the query amount.
                    convertedAmount: item.currency_primary === item.currency_secondary ? formatNumber(queryAmount, 6): formatNumber(item.convertedAmount, 2),
                    rate: item.rate,
                    inverseRate: inverseRate,
                    cryptonatorURL: "http://www.cryptonator.com/rates#" + item.currency_secondary,
                    fromFlag: currency_image(item.currency_primary),
                    toFlag: currency_image(item.currency_secondary),
                    currencyName: "Placeholder",
                    liveUrl: "Placeholder",
                    cryptoTime: cryptoTime,
                    cryptoDate: cryptoDate
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
