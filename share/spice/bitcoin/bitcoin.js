function ddg_spice_bitcoin(api_result) {

    if (!api_result) {
        return;
    }

    var symbolsAtEnd = ["PLN", "SEK"];

    function getFormattedPrice(currency, price, symbol) {

        price = price.toFixed(2).toString();
        if ($.inArray(currency, symbolsAtEnd) !== -1) {
            return price + symbol;
        }
        return symbol + price;
    }

    var DEFAULT_CURRENCY = "USD";

    var query = DDG.get_query();
    var params = query.split(/\s+/g);

    var prices = null;
    var currency = null;

    for (var i=0; i < params.length; i++) {
        currency = $.trim(params[i].toUpperCase());
        prices = api_result[currency];
        if (prices) {
            break;
        }
    }

    if (!prices) {
        currency = DEFAULT_CURRENCY;
        prices = api_result[currency];
    }    

    var buy = {
        formatted_price: getFormattedPrice(currency, prices.buy, prices.symbol),
        title: "Buy"
    };

    var sell = {
        formatted_price: getFormattedPrice(currency, prices.sell, prices.symbol),
        title: "Sell"
    };

    Spice.render({
        header1           : "Bitcoin Exchange Prices (" + currency + ")" ,
        source_name       : "Blockchain",
        spice_name        : "bitcoin",
        source_url        : 'http://markets.blockchain.info/',
        force_favicon_url : "http://blockchain.info/favicon.ico",

        template_frame   : "twopane",
        template_options : {
            left : { template: "bitcoin", data: buy },
            right : { template: "bitcoin", data: sell }
        },
        force_no_fold    : true,
        force_big_header : true
    });
}