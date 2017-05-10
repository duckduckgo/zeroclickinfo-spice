(function(env) {
    "use strict";

    // The exchange rate
    var exchange_rate = {
        from_currency: undefined,
        to_currency: undefined,
        rate: undefined,
    }
    
    // Currencies that we don't have flags for.
    var currency2country_extra = {
        "xaf": true,
        "xag": true,
        "xau": true,
        "xbt": true,
        "xcd": true,
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
    
    // Currencies with non-standard decimal points. (Standard is 2 eg. 10.46)
    var decimal_places = {
        "xbt": 8
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
    
    env.ddg_spice_currency = function(api_result) {

        // Check if there are any errors in the response.
        if(!api_result || !api_result.conversion || !api_result.topConversions || 
           !api_result.conversion || Object.keys(api_result.conversion).length === 0 || 
           !api_result.topConversions.length || api_result.topConversions.length === 0) {
            return Spice.failed('currency');
        }

        var results = [];
        var mainConv = api_result.conversion;
        var topCovs = api_result.topConversions;
        var templates = {};

        // caches the retrieved information in the UI
        exchange_rate.rate = +$(mainConv["conversion-rate"].split(" ")).get(-2);
        

        if(mainConv["from-currency-symbol"] !== mainConv["to-currency-symbol"]) {
            // Flag the input to get different output
            // if is pair get paris tile layout
            results = [mainConv];
        } else {
            // Mark which item is the first one.
            // Since HandlebarsJS (with the way we use them) is unaware of the current index.
            mainConv.initial = true;
            results.push(mainConv);
            
            for(var i = 0; i < topCovs.length; i++) {
                results.push(topCovs[i]);
            }
        }
        
        // Format the time and date.
        var timestr = mainConv["rate-utc-timestamp"].split(/\s+/);
        var xeDate = timestr[0];
        var xeTime = timestr[1].match(/\d{2}\:\d{2}\b/);
        var liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From=' + mainConv["from-currency-symbol"] + '&To=' + mainConv["to-currency-symbol"];
        
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
        
        // Add commas to the numbers for display.
        function formatNumber(x, symbol) {
            // Check if the number has a decimal point.
            // If it does, only show the standard number digits after the decimal place for a given currency.
            symbol = symbol.toLowerCase();
            if(/\./.test(x.toString())) {
                var precision = decimal_places[symbol] || 2;
                x = x.toFixed(precision);
            }
        
            return DDG.commifyNumber(x);
        }
        
        var templateObj = {
            detail: Spice.currency.detail,
            detail_mobile: Spice.currency.detail_mobile,
            item: Spice.currency.item,
            item_detail: false
        };
        
        // We need to disable the detail view when we're showing the tiles.
        if(results.length > 1) {
            templateObj.detail = false;
            templateObj.detail_mobile = false;
        }
        
       // Set favicon
       var icon = ((DDG.is3x || DDG.is2x) ? DDG.get_asset_path('currency',"assets/xe.png") : "http://www.xe.com/favicon.ico");
        
        Spice.add({
            id: 'currency',
            name: 'Currency',
            data: results,
            signal: 'high',
            meta: {
                sourceUrl: "http://www.xe.com",
                sourceName: "xe.com",
                itemType: "Conversions"
            },
            normalize: function(item) {
                // Return null if the results aren't numbers.
                if(!DDG.isNumber(+item["from-amount"]) || !DDG.isNumber(+item["converted-amount"])) {
                    return null;
                }
                
                return {
                    fromCurrencySymbol: item["from-currency-symbol"],
                    toCurrencySymbol: item["to-currency-symbol"],
                    amount: formatNumber(+item["from-amount"], item["from-currency-symbol"]),
                    convertedAmount: formatNumber(+item["converted-amount"], item["to-currency-symbol"]),
                    rate: item["conversion-rate"],
                    inverseRate: item["conversion-inverse"],
                    xeUrl: 'http://www.xe.com/currencycharts/?from=' + item["from-currency-symbol"] + '&to=' + item["to-currency-symbol"],
                    fromFlag: currency_image(item["from-currency-symbol"]),
                    toFlag: currency_image(item["to-currency-symbol"]),
                    currencyName: item["to-currency-name"],
                    liveUrl: liveUrl,
                    xeTime: xeTime,
                    xeDate: xeDate,
                    moreAtIcon: icon
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
