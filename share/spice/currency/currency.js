(function(env) {
    "use strict";
    
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
    
    var currency2country_translate = {
        'gb': 'uk'
    };
    
    // Resize the size of the outer container if the content of the inner container
    // overflows.
    function resizeContainer() {        
        var resultHeight = $(".zci--currency-result").outerHeight();
        
        if(resultHeight > 65) {
            $(".zci--currency-container").css("height", "9em");
        } else {
            $(".zci--currency-container").css("height", "5em");
        }
    }
    
    env.ddg_spice_currency = function(api_result) {

        // Check if there are any errors in the response.
        if(!api_result || !api_result.conversion || !api_result.topConversions || 
           !api_result.conversion.length || api_result.conversion.length === 0 || 
           !api_result.topConversions.length || api_result.topConversions.length === 0) {
            Spice.failed('currency');
        }
        
        var results = [];
        var mainConv = api_result.conversion;
        var topCovs = api_result.topConversions;
        var templates = {};

        if(mainConv["from-currency-symbol"] !== mainConv["to-currency-symbol"]) {
            // Flag the input to get different output
            // if is pair get paris tile layout
            mainConv.isPair = true;
            results = [mainConv];
        } else {
            // Exit early for now to disable tile view.
            return; 
            
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
            
            symbol = symbol.slice(0, 2).toLowerCase();
            symbol = symbol in currency2country_translate ? currency2country_translate[symbol] : symbol;
            return DDG.settings.region.getLargeIconURL(symbol);
        }
        
        // Add commas to the numbers for display.
        function numberWithCommas(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
        
        Spice.add({
            id: 'currency',
            name: 'Currency',
            data: results,
            meta: {
                sourceUrl: "http://www.xe.com",
                sourceName: "xe.com",
                sourceIconUrl: "http://www.xe.com/favicon.ico",
                itemType: "Currencies"
            },
            normalize: function(item) {
                // Return null if the results aren't numbers.
                if(!DDG.isNumber(+item["from-amount"]) || !DDG.isNumber(+item["converted-amount"])) {
                    return null;
                }
                
                return {
                    fromCurrencySymbol: item["from-currency-symbol"],
                    toCurrencySymbol: item["to-currency-symbol"],
                    amount: numberWithCommas(+item["from-amount"]),
                    convertedAmount: numberWithCommas(+item["converted-amount"]),
                    rate: item["conversion-rate"],
                    inverseRate: item["conversion-inverse"],
                    xeUrl: 'http://www.xe.com/currencycharts/?from=' + item["from-currency-symbol"] + '&to=' + item["to-currency-symbol"],
                    fromFlag: currency_image(item["from-currency-symbol"]),
                    toFlag: currency_image(item["to-currency-symbol"]),
                    currencyName: item["to-currency-name"],
                    liveUrl: liveUrl,
                    xeTime: xeTime,
                    xeDate: xeDate
                };
            },
            templates: {
                detail: Spice.currency.detail,
                detail_mobile: Spice.currency.detail_mobile
            },
            onShow: function() {
                // The desktop template depends on a JS function that manages the
                // size of the container.
                if(!is_mobile) {
                    $(window).load(resizeContainer);
                    $(window).resize(resizeContainer);
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
        return amount;
    });
}(this));