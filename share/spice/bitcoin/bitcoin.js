!function(env) {
    "use strict";
    // Some currencies such as PLN have their symbols at the end, i.e.,
    // 30zł instead of $30. This function does that for us.
    function getFormattedPrice(currency, price, symbol) {
        var symbolsAtEnd = {
            PLN: !0,
            SEK: !0
        };
        if (price = price.toFixed(2).toString(), symbolsAtEnd[currency]) {
            return price + symbol;
        }
        return symbol + price;
    }
    function getQueryParams() {
        var script = $('[src*="/js/spice/bitcoin/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/bitcoin\/([^\/]*)/)[1];
        if (query = $.trim(decodeURIComponent(query)), !query) {
            return [];
        }
        return query.split(/\s+/g);
    }
    env.ddg_spice_bitcoin = function(api_result) {
        var DEFAULT_CURRENCY = "USD";
        var params = getQueryParams();
        var prices = null;
        var currency = null;
        if (0 == params.length) {
            currency = DEFAULT_CURRENCY, prices = api_result[currency];
        } else {
            if (params.length > 1) {
                // Just allow the currency as a parameter
                return Spice.failed("bitcoin");
            } else {
                if (currency = $.trim(params[0].toUpperCase()), prices = api_result[currency], !prices) {
                    // Is not a valid currency
                    return Spice.failed("bitcoin");
                }
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
            id: "bitcoin",
            name: "Answer",
            data: {
                buy: buy,
                sell: sell
            },
            meta: {
                sourceName: "Blockchain",
                sourceUrl: "http://markets.blockchain.info/",
                sourceIcon: !0
            },
            template_group: "info",
            templates: {
                options: {
                    content: Spice.bitcoin.content
                }
            }
        });
    };
}(this);