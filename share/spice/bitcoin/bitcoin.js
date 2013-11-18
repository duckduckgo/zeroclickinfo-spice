function ddg_spice_bitcoin(api_result) {

    if (!api_result) {
        return;
    }

    var DEFAULT_CURRENCY = "USD";
    var symbolsAtEnd = ["PLN", "SEK"];

    function getFormattedPrice(currency, price, symbol) {

        price = price.toFixed(2).toString();
        if ($.inArray(currency, symbolsAtEnd) !== -1) {
            return price + symbol;
        }
        return symbol + price;
    }

    function getQueryParams() {

        var script = $('[src*="/js/spice/bitcoin/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/bitcoin\/([^\/]*)/)[1];
        query = $.trim(query.replace(/%20/g, " "));

        if (!query) {
            return [];
        }

        return query.split(/\s+/g);
    }
    
    var params = getQueryParams();

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

        if (params.length > 0) {
            //No parameter matches the valid currencies and is not an empty query
            return;
        }
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