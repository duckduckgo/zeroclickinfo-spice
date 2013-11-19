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
        query = $.trim(decodeURIComponent(query));

        if (!query) {
            return [];
        }

        return query.split(/\s+/g);
    }
    
    var params = getQueryParams();

    var prices = null;
    var currency = null;

    if (params.length == 0) {

        currency = DEFAULT_CURRENCY;
        prices = api_result[currency];
    }
    else if (params.length > 1) {

        // Just allow the currency as a parameter
        return;
    } 
    else {

        currency = $.trim(params[0].toUpperCase());
        prices = api_result[currency];

        if (!prices) {
            // Is not a valid currency
            return;
        }
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