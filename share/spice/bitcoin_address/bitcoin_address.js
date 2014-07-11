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
            data: {
                record_data: {
                    "Current Balance": formatBtc(address.balance),
                    "Total Received": formatBtc(address.total_received),
                    "Total Sent": formatBtc(address.total_sent),
                    "Hash160": address.hash160
                }
            },
            meta: {
                sourceName: "Biteasy",
                sourceUrl: "https://www.biteasy.com/blockchain/addresses/" + address.address
            },
            normalize: function(item) {
                return {
                    image: 'https://www.biteasy.com/blockchain/addresses/'+address.address+'/qrcode.jpeg',
                    img_m: 'https://www.biteasy.com/blockchain/addresses/'+address.address+'/qrcode.jpeg'
                };
            },
            templates: {
                group: 'info',
                options:{
                    content: 'record',
                    item: 'basic_image_item',
                    rowHighlight: true
                }
            }
        });
    };
}(this));