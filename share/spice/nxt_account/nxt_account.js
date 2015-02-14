(function (env) {
    "use strict";

    var formatNxt = function(amount) {
        return (amount / 100000000)+" NXT"
    };

    env.ddg_spice_nxt_account = function(api_result) {

        if (!api_result) {
            return Spice.failed('nxt_account');
        }

        Spice.add({
            id: "nxt_account",
            name: "Nxt Blockchain",
            data: {
                record_data: {
                    "Current Balance": formatNxt(api_result.balanceNQT),
                    "Forged Balance": formatNxt(api_result.forgedBalanceNQT),
                    "Assets Owned": api_result.assetBalances.length
                }
            },
            meta: {
                sourceName: "myNXT.info",
                sourceUrl: "http://www.mynxt.info/blockexplorer/details.php?action=ac&ac="+api_result.accountRS
            },
            normalize: function(item) {
                return {
                    image: 'https://api.qrserver.com/v1/create-qr-code/?size=110x110&data='+api_result.accountRS,
                    img_m: 'https://api.qrserver.com/v1/create-qr-code/?size=110x110&data='+api_result.accountRS
                };
            },
            templates: {
                group: 'info',
                options:{
                    moreAt: true,
                    content: 'record',
                    item: 'basic_image_item',
                    rowHighlight: true
                }
            }
        });
    };
}(this));