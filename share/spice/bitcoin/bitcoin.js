(function (env) {
    "use strict";

    env.ddg_spice_bitcoin = function(api_result) {

        if (!api_result || api_result.status !== 200) {
            return Spice.failed('bitcoin');
        }


        var script = $('[src*="/js/spice/bitcoin/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/bitcoin\/([a-z]{0,12})/)[1]);

        api_result = api_result.data;

        var formatBtc = function(amount) {
            return (amount / 100000000.0) + " BTC";
        };

        DDG.require('moment.js', function(){
            var spice = {
                id: "bitcoin",
                name: "Answer",
                data: api_result,
                meta: {
                    sourceName: "Biteasy"
                },
                templates: {
                    options:{
                        content: 'record'
                    }
                },
            };

            switch (query) {
                case "addresses":
                    spice.templates.group = "info";
                    spice.data = {
                        "record_data": {
                            "Current Balance": formatBtc(api_result.balance),
                            "Total Received": formatBtc(api_result.total_received),
                            "Total Sent": formatBtc(api_result.total_sent),
                            "Hash160": api_result.hash160
                        }
                    };
                    spice.normalize = function(item) {
                        return {
                            image: 'https://www.biteasy.com/blockchain/addresses/' + api_result.address + '/qrcode.jpeg',
                            img_m: 'https://www.biteasy.com/blockchain/addresses/' + api_result.address + '/qrcode.jpeg'
                        };
                    };
                    spice.meta.sourceUrl = "https://www.biteasy.com/blockchain/addresses/" + api_result.address;
                    break;

                case "transactions":
                    spice.templates.group = "list";
                    spice.data = {
                        "record_data": {
                            "Hash": api_result.hash,
                            "Date Time": moment(api_result.time).format('MMM DD YYYY, h:mm:ss a'),
                            "Confirmations": api_result.confirmations,
                            "Size": (api_result.size / 1024.0).toFixed(2) + " KB",
                            "Total Input": formatBtc(api_result.inputs_value),
                            "Total Output": formatBtc(api_result.outputs_value),
                            "Coinbase": api_result.is_coinbase ? 'Yes' : 'No',
                            "Fee": formatBtc(api_result.fee),
                            "BTC Transacted": formatBtc(api_result.transacted_value)
                        }
                    };

                    spice.meta.sourceUrl = "https://www.biteasy.com/blockchain/transactions/" + api_result.address;
                    break;

                case "blocks":
                    spice.templates.group = "list";
                    var genesisHash = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";
                    spice.data = {
                        "record_data": {
                            "Height": api_result.height.toString(),
                            "Solved At": moment(api_result.solved_at).format('MMM DD YYYY, h:mm:ss a'),
                            "Hash": api_result.hash,
                            "Previous Block": (genesisHash === api_result.hash ? 'N/A' : api_result.previous_block),
                            "Merkle root": api_result.merkle_root,
                            "Version": api_result.version,
                            "Size": (api_result.size/1024.0).toFixed(2)+" KB",
                            "Nonce": api_result.nonce,
                            "Difficulty": api_result.difficulty,
                            "Transactions": api_result.num_transactions,
                            "Total Fees": formatBtc(api_result.total_fees),
                            "Block Reward": formatBtc(api_result.inflation)
                        }
                    };
                    spice.meta.sourceUrl = "https://www.biteasy.com/blockchain/blocks/" + api_result.hash;
                    break;
            }
            Spice.add(spice);
         });
    };
}(this));
