(function (env) {
    "use strict";

    // Currencies that we have flags for.
    // These correspond to traditional currencies of countries.
    var currency2country = {
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

    // Cryptocurrencies that we have flags for.
    var crypto_flags = {
        "aur": true,
        "blk": true,
        "btc": true,
        "bts": true,
        "dgb": true,
        "doge": true,
        "doged": true,
        "drk": true,
        "ftc": true,
        "ifc": true,
        "ltc": true,
        "mec": true,
        "mst": true,
        "myr": true,
        "nmc": true,
        "nvc": true,
        "nxt": true,
        "pot": true,
        "ppc": true,
        "qrk": true,
        "sdc": true,
        "utc": true,
        "wdc": true,
        "xpm": true,
        "xpy": true,
        "xrp": true
    }

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
            source = decodeURIComponent($(script).attr("src"));

        if (ticker && ticker.base && ticker.target && ticker.price) {

            // Get amount from original query
            var query = source.match(/\/ticker\/(?:.*)\/(.+)/)[1],
                queryAmount = parseFloat(query),
                // Calculate price, rates, and amounts
                base = ticker.base,
                target = ticker.target,
                price = parseFloat(ticker.price);

            results = api_result;
            convertedAmount = queryAmount * price;
            rate = "1 " + target + " = " + formatNumber((1 / price), base, 8) + " " + base;
            inverseRate = "1 " + base + " = " + formatNumber(price, target, 8) + " " + target;
            // Format Time and Date
            timestamp = api_result.timestamp * 1000;

        } else if (rows && rows.length) {

            // Get amount from original query
            var query = source.match(/\/secondaries\/(.+)\/(?:.*)/)[1],
                displayName = capitalizeFirstLetter(query.match(/([^\d]+)/)[1]),
                queryAmount = parseFloat(query),
                // Prepare the first item box
                givenCurrency = {
                    created: rows[0].created,
                    currency_primary: rows[0].currency_primary,
                    currency_secondary: rows[0].currency_primary,
                    convertedAmount: 1,
                    currencyName: displayName,
                    initial: true
                };
                results.push(givenCurrency);

            // Add the remaining currencies
            for (var i = 0; i < rows.length; i++) {
                var base = rows[i].currency_primary,
                    target = rows[i].currency_secondary,
                    price = parseFloat(rows[i].tradeprice);
                rows[i].convertedAmount = queryAmount * price;
                rows[i].rate = "1 " + base + " = " + formatNumber(price, target, 8) + " " + target;
                results.push(rows[i]);
            }

            // Format Time and Date
            timestamp = rows[0].created;
        } else {
            return Spice.failed('cryptocurrency');
        }

        // Get the flag image.
        function currency_image(symbol) {

            symbol = symbol.toLowerCase();

            // Most cryptocurrencies will not have flags associated with countries
            // They will need to have their own flag provided for them.
            if(!(symbol in currency2country)) {

                if (!(symbol in crypto_flags)) {
                    // if we don't have a specific flag, return the generic png.
                    symbol = "generic";
                }

                var img_path = Modernizr.svg ? 'assets/svg/' + symbol.toUpperCase() + '.svg' : 'assets/png/32/' + symbol.toUpperCase() + '.png';

                /* TODO Determine if we're using 64px, 96px PNGs. If not remove this */
                /*return DDG.get_asset_path('cryptocurrency', 'assets/' + (DDG.is3x ? '96' : DDG.is2x ? '64' : '32') + '/' + symbol + '.' + img_ext);*/
                return DDG.get_asset_path('cryptocurrency', img_path);
            }

            symbol = symbol.slice(0, 2);
            symbol = symbol in currency2country_translate ? currency2country_translate[symbol] : symbol;
            return DDG.settings.region.getLargeIconURL(symbol);
        }

        // Add commas to the numbers for display and formats decimals.
        function formatNumber(x, currency, limit) {
            var traditionalCurrencies = ['','cny','eur','gbp','hkd','jpy','nzd','pln','rur','sgd','usd'];

            // Check if the number has a decimal point.
            if(decimalPlaces(x) > 0) {

                // Traditional currencies print two decimal places, cryptocurrencies up to 8.
                if (traditionalCurrencies.indexOf(currency.toLowerCase()) > -1) {
                    x = formatDecimal(x, 2);
                } else {
                    x = formatDecimal(x, limit);
                }
            }
            return DDG.commifyNumber(x);
        }

        // Handles cases like '0.00'
        function formatDecimal(x, limit) {
            var leadingZerosRegex = /(?:\.)([0]*)(?:[1-9])/g;
            var leadingZeros = leadingZerosRegex.exec(x.toString())[1].length;

            // If there are more leading zeros in the decimal than the limit, then increase the limit to the first non-zero number
            if (leadingZeros >= limit) {
                x = x.toFixed(leadingZeros + 1);
            } else {
                x = x.toFixed(limit);
            }

            // Removes trailing 0s.
            return parseFloat(x);
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
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

        DDG.require('moment.js', function(){
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
                        amount: formatNumber(queryAmount, item.ticker.base, 4),
                        convertedAmount: formatNumber(convertedAmount, item.ticker.target, 4),
                        rate: rate,
                        inverseRate: inverseRate,
                        cryptonatorURL: "http://www.cryptonator.com/rates#" + item.ticker.base,
                        fromFlag: currency_image(item.ticker.base),
                        toFlag: currency_image(item.ticker.target),
                        currencyName: "Placeholder",
                        liveURL: "Placeholder",
                        cryptoTime: moment(timestamp).format("HH:mm"),
                        cryptoDate: moment(timestamp).format("YYYY-DD-MM")
                    };
                }
                return {
                    fromCurrencySymbol: item.currency_primary,
                    toCurrencySymbol: item.currency_secondary,
                    amount: formatNumber(queryAmount, item.currency_secondary, 4),
                    // If item is the queried currency, then display the query amount.
                    convertedAmount: item.currency_primary === item.currency_secondary ? formatNumber(queryAmount, item.currency_secondary): formatNumber(item.convertedAmount, item.currency_secondary, 4),
                    rate: item.rate,
                    inverseRate: inverseRate,
                    cryptonatorURL: "http://www.cryptonator.com/rates#" + item.currency_secondary,
                    fromFlag: currency_image(item.currency_primary),
                    toFlag: currency_image(item.currency_secondary),
                    cryptoCurrencyName: item.currencyName,
                    liveUrl: "Placeholder",
                    cryptoTime: moment(timestamp).format("HH:mm"),
                    cryptoDate: moment(timestamp).format("YYYY-DD-MM")
                };
            },
            templates: templateObj,
            onShow: function() {
                // The desktop template depends on a JS function that manages the
                // size of the container.
                if(!DDG.device.isMobile) {
                    $(window).on('load', resize);
                    $(window).resize(resize);
                } else {
                    $(window).on('load', resizeMobile);
                    $(window).resize(resizeMobile);
                }
            }
        });
        });
    };
}(this));
