(function (env) {
    "use strict";

    env.ddg_spice_bitcoin = function(api_result) {

        if (!api_result || api_result.code !== 200) {
            return Spice.failed('bitcoin');
        }


        var script = $('[src*="/js/spice/bitcoin/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/bitcoin\/([a-z]{0,12})/)[1]);

        api_result = api_result.data;

        var formatBtc = function(amount) {
            return parseFloat(amount).toFixed(8) + " BTC";
        };
        
        var Btcsum = function(txs) {
            var ret = 0;
            for(var i in txs) {
                ret += parseFloat(txs[i].amount);
            }
            return ret;
        };

        DDG.require('moment.js', function(){
            var spice = {
                id: "bitcoin",
                name: "Answer",
                data: api_result,
                meta: {
                    sourceName: "blockr"
                },
                templates: {
                    options:{
                        content: 'record'
                    }
                },
            };

            switch (query) {
                case "address":
                    spice.templates.group = "info";
                    spice.data = {
                        "record_data": {
                            "Balance": formatBtc(api_result.balance),
                            "Total Received": formatBtc(api_result.totalreceived),
                            "Transactions": api_result.nb_txs
                        }
                    };
                    spice.normalize = function(item) {
                        return {
                            title: "BTC Address: " + api_result.address,
                            image: 'https://blockr.io/api/v1/address/Qr/' + api_result.address,
                            img_m: 'https://blockr.io/api/v1/address/Qr/' + api_result.address
                        };
                    };
                    spice.meta.sourceUrl = "https://blockr.io/address/info/" + api_result.address;
                    break;

                case "tx":
                    spice.templates.group = "list";
                    spice.data = {
                        "record_data": {
                            "Hash": api_result.tx,
                            "Block": api_result.block,
                            "Date Time": moment(api_result.time_utc).format('MMM DD YYYY, h:mm:ss a'),
                            "Sum of outgoing transactions": formatBtc(Btcsum(api_result.vouts)),
                            "Traded": formatBtc(Btcsum(api_result.trade.vouts)),
                            "Fee": formatBtc(api_result.fee),
                            "Confirmations": api_result.confirmations,
                            "Coinbase": (api_result.is_coinbased ===  48 ? 'No' : 'Yes')
                        }
                    };
                    spice.normalize = function(item) {
                        return {
                            title: "BTC Transaction: " + api_result.tx
                        };
                    };
                    spice.meta.sourceUrl = "https://blockr.io/tx/info/" + api_result.hash;
                    break;

                case "block":
                    spice.templates.group = "list";
                    spice.data = {
                        "record_data": {
                            "Height": api_result.nb.toString(),
                            "Solved At": moment(api_result.time_utc).format('MMM DD YYYY, h:mm:ss a'),
                            "Trades sum": formatBtc(api_result.vout_sum),
                            "Hash": api_result.hash,
                            "Previous Block": api_result.prev_block_hash ? api_result.prev_block_hash : 'N/A',
                            "Next Block": api_result.next_block_hash ? api_result.next_block_hash : 'N/A',
                            "Merkle root": api_result.merkleroot,
                            "Version": api_result.version,
                            "Size": (api_result.size/1024.0).toFixed(2)+" KB",
                            "Difficulty": api_result.difficulty,
                            "Confirmations": api_result.confirmations,
                            "Transactions": api_result.nb_txs,
                            "Total Fees": formatBtc(api_result.fee)
                        }
                    };
                    spice.normalize = function(item) {
                        return {
                            title: "BTC Block: " + api_result.nb
                        };
                    };
                    spice.meta.sourceUrl = "https://blockr.io/block/info/" + api_result.nb;
                    break;
            }
            Spice.add(spice);
         });
    };
}(this));
