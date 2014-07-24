(function (env) {
    "use strict";

    var formatDate = function(d) {
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDay();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();

        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds; 
    };

    var formatBtc = function(amount) {
        return (amount / 100000000.0)+" BTC";
    };

    env.ddg_spice_bitcoin_transaction = function(api_result) {

        if (!api_result || api_result.status !== 200) {
            return Spice.failed('bitcoin_transaction');
        }

        var transaction = api_result.data;
        
        Spice.add({
            id: "bitcoin_transaction",
            name: "Bitcoin Transaction",
            data: {
                record_data: {
                    "Hash": transaction.hash,
                    "Date Time": formatDate(new Date(transaction.created_at)),
                    "Confirmations": transaction.confirmations,
                    "Size": (transaction.size/1024.0).toFixed(2)+" KB",
                    "Total Input": (transaction.inputs_value / 100000000.0)+" BTC",
                    "Total Output": (transaction.outputs_value / 100000000.0)+" BTC",
                    "Coinbase": transaction.is_coinbase ? 'Yes' : 'No',
                    "Fee": formatBtc(transaction.fee),
                    "BTC Transacted": (transaction.transacted_value / 100000000.0)+" BTC"
                }
            },
            meta: {
                sourceName: "Biteasy",
                sourceUrl: "https://www.biteasy.com/blockchain/transactions/" + transaction.hash
            },
            templates: {
                group: 'base',
                options: {
                    content: 'record',
                    moreAt: true,
                    rowHighlight: true
                }
            }
        });
    };
}(this));