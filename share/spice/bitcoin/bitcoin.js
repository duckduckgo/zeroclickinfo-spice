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
        var script = $('[src*="/js/spice/bitcoin/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/bitcoin\/([^\/]+)(?:\/(.+))?/);

        if (query[2]) {
            return query.slice(1);
        } else {
            return [query[1]];
        }
    }

    env.ddg_spice_bitcoin = function(api_result) {
        var DEFAULT_CURRENCY = "USD",
            params = getQueryParams(),
            currency = params[0].toUpperCase(),
            prices = api_result[currency],
            query = DDG.get_query().toLowerCase(),
            buy, sell;

        if (params.length > 2 || params.length < 1) {
            // Just allow the currency as a parameter
            return Spice.failed('bitcoin');
        } else if (params.length === 2) {
            //query is "x btc in yyy" or "x yyy in btc"
            var xbtc_regex = new RegExp(/.+ (?:btc|bitcoin) (?:in|to) (.{3})/),
                xyyy_regex = new RegExp(/.+ (.{3}) (?:in|to) (?:btc|bitcoin)/);

            if (xbtc_regex.exec(query)) {
                var to = prices.buy * +params[1];

                buy = {
                    formatted_price: getFormattedPrice('BTC', +params[1], '฿'),
                    title: "FROM"
                }

                sell = {
                    formatted_price: getFormattedPrice(currency, to, prices.symbol),
                    title: "TO"
                }
            } else if (xyyy_regex.exec(query)) {
                var to = +params[1] / prices.buy;

                buy = {
                    formatted_price: getFormattedPrice(currency, +params[1], prices.symbol),
                    title: "FROM"
                }

                sell = {
                    formatted_price: getFormattedPrice('BTC', to, '฿'),
                    title: "TO"
                }
            } else {
                return Spice.failed('bitcoin');
            }
        } else {
            //query like "btc in usd" or "bitcoin exchange in dkk"
            if (!prices) {
                // Is not a valid currency
                return Spice.failed('bitcoin');
            }

            buy = {
                formatted_price: getFormattedPrice(currency, prices.buy, prices.symbol),
                title: "BUY"
            };

            sell = {
                formatted_price: getFormattedPrice(currency, prices.sell, prices.symbol),
                title: "SELL"
            };
        }


        Spice.add({
            id: "bitcoin",
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
                group: 'info',
                options: {
                    content: Spice.bitcoin.content
                }
            }
        });
    };
}(this));
