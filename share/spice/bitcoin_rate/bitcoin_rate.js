(function(env) {
    "use strict";

    // Some currencies such as PLN have their symbols at the end, i.e.,
    // 30zł instead of $30. This function does that for us.
    function getFormattedPrice(currency, price, symbol) {
        var symbolsAtEnd = {
            "PLN": true,
            "SEK": true
        };

        price = price.toFixed(2).toString();
        if (symbolsAtEnd[currency]) {
            return price + symbol;
        }
        return symbol + price;
    }

    function getQueryParams() {
        var script = $('[src*="/js/spice/bitcoin_rate/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/bitcoin_rate\/([^\/]*)/)[1];

        query = $.trim(decodeURIComponent(query));
        if (!query) {
            return [];
        }

        return query.split(/\s+/g);
    }

    env.ddg_spice_bitcoin_rate = function(api_result) {
        var DEFAULT_CURRENCY = "USD",
            params = getQueryParams(),
            prices = null,
            currency = null;

        if(!api_result) {
            return Spice.failed('bitcoin_rate');
        }
        
        if (params.length == 0) {
            currency = DEFAULT_CURRENCY;
            prices = api_result[currency];
        } else if (params.length > 1) {
            // Just allow the currency as a parameter
            return Spice.failed('bitcoin_rate');
        } else {
            currency = $.trim(params[0].toUpperCase());
            prices = api_result[currency];

            if (!prices) {
                // Is not a valid currency
                return Spice.failed('bitcoin_rate');
            }
        }

        var buy = {
            formatted_price: getFormattedPrice(currency, prices.buy, prices.symbol),
            title: "BUY"
        };

        var sell = {
            formatted_price: getFormattedPrice(currency, prices.sell, prices.symbol),
            title: "SELL"
        };

        Spice.add({
            id: "bitcoin_rate",
            name: 'Answer',
            signal: 'high',
            data: {
                buy: buy,
                sell: sell
            },
            meta: {
                sourceName: "Blockchain",
                sourceUrl: 'http://markets.blockchain.info/',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.bitcoin_rate.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
