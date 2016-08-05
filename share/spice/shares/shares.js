(function (env) {
    'use strict';
    env.ddg_spice_shares = function(api_result){

        if (!api_result || api_result.length < 1 || !api_result[0]) {
            return Spice.failed('shares');
        }

        var url = api_result[0].home_page || 'https://stockflare.com/stocks/' + api_result[0].ric;

        DDG.require('moment.js', function(){
            Spice.add({
                id: 'shares',
                name: 'Shares',
                data: api_result[0],
                meta: {
                    sourceName: url,
                    sourceUrl: url
                },
                normalize: function(data) {
                    var forecast_pe = (data.forecast_pe && data.forecast_pe > 0) ?
                        Math.ceil(data.forecast_pe) : null;

                    var dividend = data.forecast_dividend_yield && data.forecast_dividend_yield >= 0 ?
                        (data.forecast_dividend_yield * 100).toFixed(1) : null;

                    return {
                      name: data.short_name,
                      ric: data.ric.toUpperCase(),
                      updated_at: moment.unix(data.updated_at).format("MMM DD"),
                      currency: data.currency_code.toUpperCase(),
                      price: data.price.toFixed(2),
                      valueChange: data.absolute_change,
                      percentageChange: data.price_change.toFixed(1),
                      value: data.market_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      forecast_pe: forecast_pe,
                      dividend: dividend,
                      arrow: (data.price_change > 0) ? 'up' : 'down',
                      url: 'https://stockflare.com/stocks/' + data.ric
                    };
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.shares.shares,
                        moreAt: true,
                        moreText: {
                            href: 'https://stockflare.com',
                            text: 'Data by Stockflare'
                        }
                    }
                }
            });
        });
    };
}(this));
