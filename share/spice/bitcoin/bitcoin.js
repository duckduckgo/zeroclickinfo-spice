function ddg_spice_bitcoin (api_result) {
    
    if (!api_result) return;

    var DEFAULT_CURRENCY = "USD";

    var query = DDG.get_query();
    var params = query.split(/\s+/g);

    if (params.length > 1) {
        var currency = params[1].toUpperCase();
    } else {
        var currency = DEFAULT_CURRENCY;
    }

    var prices = api_result[currency];
    if (!prices) {
        prices = api_result[DEFAULT_CURRENCY];
    }

    var buy = {
        price: prices.buy.toFixed(2),
        symbol: prices.symbol,
        title: "Buy"
    }

    var sell = {
        price: prices.sell.toFixed(2),
        symbol: prices.symbol,
        title: "Sell"
    }

    Spice.render({
        header1           : "Bitcoin Exchange Prices",
        source_name       : "Bitcoin",
        spice_name        : "bitcoin",
        source_url        : 'http://markets.blockchain.info/',

        template_frame   : "twopane",
        template_options : {
            left : { template: "bitcoin", data: buy },
            right : { template: "bitcoin", data: sell },
        },
        force_no_fold    : true,
        force_big_header : true
    });
}