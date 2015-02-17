(function (env) {
    "use strict";
    
    // Currencies that we have flags for.
    // These correspond to traditional currencies of countries.
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
        var resultHeight = $(".zci--cryptocurrency-result").outerHeight();
        
        if(resultHeight > 65) {
            $(".zci--cryptocurrency-container").css("height", "9em");
        } else {
            $(".zci--cryptocurrency-container").css("height", "5em");
        }
    }
    
    // Change the look of the mobile view if the content overflows.
    function resizeMobile() {
        var tileHeight = $(".zci--cryptocurrency .tile--s").outerHeight();

        if(tileHeight > 155) {
            $(".zci--cryptocurrency .tile--s").addClass("large").removeClass("small");
        } else {
            $(".zci--cryptocurrency .tile--s").addClass("small").removeClass("large");
        }
    }
    
    function decimalPlaces(number) {
        return (number.toString()).replace(/^-?\d*\.?|0+$/g, '').length;
    }
    
    env.ddg_spice_cryptocurrency = function(api_result){

        if (!api_result) {
            return Spice.failed('cryptocurrency');
        };
        
        var results = [],
            ticker = api_result.ticker,
            rows = api_result.rows,
            convertedAmount = 0,
            rate = "",
            inverseRate = "",
            timestamp = "",
            timestr = "",
            cryptoDate = "",
            cryptoTime = "",
            script = $('[src*="/js/spice/cryptocurrency/"]')[0],
            source = $(script).attr("src");
        
        if (typeof ticker !== 'undefined') {
            // Get amount from original query
            var query = source.match(/\/ticker\/(?:.*)\/(.+)/)[1],
                queryAmount = parseFloat(decodeURIComponent(query)),
                // Calculate price, rates, and amounts
                base = api_result.ticker.base,
                target = api_result.ticker.target,
                price = parseFloat(api_result.ticker.price),
                results = api_result,
                convertedAmount = queryAmount * price,
                rate = "1 " + target + " = " + formatNumber((1 / price)) + " " + base,
                inverseRate = "1 " + base + " = " + formatNumber(price) + " " + target,
                // Format Time and Date
                timestamp = (new Date(api_result.timestamp*1000)).toISOString(),
                timestr = timestamp.split(/T+/),
                cryptoDate = timestr[0],
                cryptoTime = timestr[1].match(/\d{2}\:\d{2}\b/);
                
        } else if (typeof rows !== 'undefined') {
            // Get amount from original query
            var query = source.match(/\/secondaries\/(.+)\/(?:.*)/)[1],
                queryAmount = parseFloat(decodeURIComponent(query)),
                // Prepare the first item box
                givenCurrency = {
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
                    rows[i].rate = "1 " + base + " = " + formatNumber(price) + " " + target;
                results.push(rows[i]);
            }
            // Format Time and Date
            timestamp = rows[0].created,
                timestr = timestamp.split(/\s+/),
                cryptoDate = timestr[0],
                cryptoTime = timestr[1].match(/\d{2}\:\d{2}\b/);
            
        } else {
            return Spice.failed('cryptocurrency');
        }
        
        // Get the flag image.
        function currency_image(symbol) {
            symbol = symbol.toLowerCase();
            // Most cryptocurrencies will not have flags associated with countries
            // They will need to have their own flag provided for them.
            if(!(symbol in currency2country_extra)) {
                return DDG.get_asset_path('cryptocurrency', 'assets/' + (DDG.is3x ? '96' : DDG.is2x ? '64' : '32') + '/' + symbol + '.png');
            }
            
            symbol = symbol.slice(0, 2);
            symbol = symbol in currency2country_translate ? currency2country_translate[symbol] : symbol;
            return DDG.settings.region.getLargeIconURL(symbol);
        }
        
        // Add commas to the numbers for display.
        function formatNumber(x) {
            var decimals = decimalPlaces(x) <= 4 ? decimals = decimalPlaces(x) : decimals = 4;
            // Check if the number has a decimal point.
            if(/\./.test(x.toString())) {
                x = x.toFixed(decimals);   
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
                        amount: formatNumber(queryAmount),
                        convertedAmount: formatNumber(convertedAmount),
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
                    amount: formatNumber(queryAmount),
                    // If item is the queried currency, then display the query amount.
                    convertedAmount: item.currency_primary === item.currency_secondary ? formatNumber(queryAmount): formatNumber(item.convertedAmount),
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
