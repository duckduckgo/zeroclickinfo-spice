(function(env) {
    "use strict";
    
    function resizeIA() {
        function toExponent(n) {
            return n.toPrecision(3).replace(/e\+(.+)/, " × 10<sup>$1</sup>");
        }

        var result = $(".zci--currency-result"),
            rates = $(".zci--currency-ratesinfo"),
            main = $(".zci--currency .zci__main"),
            body = $(".zci--currency .zci__body"),
            extra = main.outerWidth() - body.outerWidth();

        function grabOriginal() {
            var amount = $(".zci--currency-first-part .zci--currency-amount");
            var original = toExponent(+amount.data("original"));
            amount.html(original);

            amount = $(".zci--currency-second-part .zci--currency-amount");
            original = toExponent(+amount.data("original"))
            amount.html(original);
        }
        
        // Check if the contents don't fit anymore.
        if(result.outerWidth() + rates.outerWidth() + extra > body.outerWidth()) {
            // Check if the results alone will fit in.
            if(result.outerWidth() + extra < body.outerWidth()) {
                rates.hide();
            // This means that the result alone won't fit.
            } else {
                grabOriginal();
            }
        } else {
            rates.show();
        }
        
        // If there are two lines, make sure that we're in exponent form.
        if(result.height() > 100) {
            grabOriginal();
        }
    }
    
    env.ddg_spice_currency = function(api_result) {

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
        
        var timestr = mainConv["rate-utc-timestamp"].split(/\s+/);
        var xeDate = timestr[0];
        var xeTime = timestr[1].match(/\d{2}\:\d{2}\b/);
        var liveUrl = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From=' + mainConv["from-currency-symbol"] + '&To=' + mainConv["to-currency-symbol"];
        
        function currency_image(symbol) {
            return "https://ddh5.duckduckgo.com/assets/currency/32/" + symbol + ".png";
        }
        
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
                detail: Spice.currency.currency_item
            },
            onShow: function() {
                resizeIA();
                $(window).resize(resizeIA);
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