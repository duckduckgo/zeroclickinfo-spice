(function (env) {
    "use strict";
    env.ddg_spice_bitcoin_address = function(api_result) {

        if (!api_result || api_result.status !== 200) {
            return Spice.failed('bitcoin_address');
        }

        var address = api_result.data;

        var formatBtc = function(amount) {
            return (amount / 100000000.0)+" BTC"
        };
        
        Spice.add({
            id: "bitcoin_address",
            name: "Bitcoin Address",
            data: address,
            meta: {
                sourceName: "biteasy",
                sourceUrl: "https://www.biteasy.com/blockchain/addresses/" + address.address
            },
            normalize: function(item) {
                var infoboxData = [{
                    heading: 'Address Info'
                },{
                    label: "Current Balance",
                    value: formatBtc(address.balance)
                },{
                    label: "Total Received",
                    value: formatBtc(address.total_received)
                },{
                    label: "Total Sent",
                    value: formatBtc(address.total_sent)
                },{
                    label: "Hash 160",
                    value: address.hash160
                }];

                return {
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.bitcoin_address.content,
                    moreAt: true
                }
            }
        });
    };
}(this));