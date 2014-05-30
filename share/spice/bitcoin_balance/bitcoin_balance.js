(function (env) {
    "use strict";
    env.ddg_spice_bitcoin_balance = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('bitcoin_balance');
        }
        
        Spice.add({
            id: "bitcoinBalance",
            name: "Bitcoin Address Balance",
            data: {
                balance: api_result.balance / 100000000
                //The balance field on the API returns satoshis, so we divide by 100000000 to convert to BTC.
            },
            meta: {
                sourceName: "Chain.com",
                sourceUrl: "http://chain.com"
            },
            templates: {
                group: 'text',
                options:{
                    content: Spice.bitcoin_balance.content,
                    moreAt: true
                }
            }
        });
    };
}(this));