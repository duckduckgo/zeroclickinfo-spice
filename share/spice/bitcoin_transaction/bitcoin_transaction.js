(function (env) {
    "use strict";
    env.ddg_spice_bitcoin_transaction = function(api_result) {

        if (!api_result || api_result.status !== 200) {
            return Spice.failed('bitcoin_transaction');
        }

        var transaction = api_result.data;

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
            return (amount / 100000000.0)+" BTC"
        };

        var transactionDescription = 
            "A transaction is a signed section of data that is broadcast"+
            " to the network and collected into blocks. It typically "+
            "references previous transaction(s) and dedicates a certain"+
            " number of bitcoins from it to one or more new public key(s)"+
            " (Bitcoin address). It is not encrypted (nothing in Bitcoin "+
            "is encrypted).";
        
        Spice.add({
            id: "bitcoin_transaction",
            name: "Bitcoin Transaction",
            data: transaction,
            meta: {
                sourceName: "biteasy.com",
                sourceUrl: "https://www.biteasy.com/blockchain/transactions/" + transaction.hash
            },
            normalize: function(item) {
                var infoboxData = [{
                    heading: 'Transaction Info'
                },{
                    label: "Confirmations",
                    value: transaction.confirmations
                },{
                    label: "Date Time",
                    value: formatDate(new Date(transaction.created_at))
                },{
                    label: "Coinbase",
                    value: transaction.is_coinbase ? 'Yes' : 'No'
                },{
                    label: "Size",
                    value: (transaction.size/1024.0).toFixed(2)+" KB"
                },{
                    label: "Total Input",
                    value: formatBtc(transaction.inputs_value)
                },{
                    label: "Total Output",
                    value: formatBtc(transaction.outputs_value)
                },{
                    label: "Fee",
                    value: formatBtc(transaction.fee)
                }];

                return {
                    description: transactionDescription,
                    title: 'Bitcoin Transaction ('+transaction.confirmations+' confirmations)',
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));