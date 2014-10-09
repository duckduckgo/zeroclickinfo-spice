(function (env) {
    "use strict";
    
    // Taken from bitcoin.pm spice
    function getQueryParams() {
        var script = $('[src*="/js/spice/btc_to_usd/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/btc_to_usd\/([^\/]*)/)[1];

        query = $.trim(decodeURIComponent(query));
        if (!query) {
            return [];
        }

        return query.split(/\s+/g);
    }
    
    
    env.ddg_spice_btc_to_usd = function(api_result){
		var params = getQueryParams();
        var sell = api_result['USD'].sell;
		var BTC_amount = params[0];
		// calculate the exchange rate with (current sell price x amount)
		var USD_amount = BTC_amount * sell;
		USD_amount = Math.round(USD_amount * 100) / 100;

        Spice.add({
            id: 'btc_to_usd',
        	name: 'Bitcoin',
			data: {
				BTC_amount: BTC_amount,
				USD_amount: USD_amount
			},
            meta: {
           		sourceName: 'blockchain.info',
           		sourceUrl: 'https://blockchain.info/api/exchange_rates_api'
            },
            templates: {
                group: 'info',
                options: {
                	content: Spice.btc_to_usd.content
                }
            }
        });
    };
}(this));