(function (env) {
    "use strict";
    env.ddg_spice_bitcoin_balance = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('bitcoin_balance');
        }
        
        Spice.add({
            id: "bitcoinBalance",
            name: "Bitcoin Address",
            signal: "medium",
            data: {
                balance: api_result.balance / 100000000.0
                //The balance field on the API returns satoshis, so we divide by 100000000 to convert to BTC.
            },
            meta: {
                sourceName: "Chain",
                sourceUrl: "https://chain.com/bitcoin/addresses/" + api_result.hash
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.bitcoin_balance.content,
                    moreAt: true
                }
            }
        });
    };
}(this));