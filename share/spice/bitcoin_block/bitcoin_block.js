(function (env) {
    "use strict";
    env.ddg_spice_bitcoin_block = function(api_result) {

        if (!api_result || api_result.status !== 200) {
            return Spice.failed('bitcoin_block');
        }

        var block = api_result.data;

        var formatDate = function(d) {
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDay();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();

            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds; 
        };

        var genesisHash = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";
        
        Spice.add({
            id: "bitcoin_block",
            name: "Bitcoin Block",
            data: {
                record_data: {
                    "Height": block.height.toString(),
                    "Solved At": formatDate(new Date(block.solved_at)),
                    "Hash": block.hash,
                    "Previous Block": (genesisHash === block.hash ? 'N/A' : block.previous_block),
                    "Merkle root": block.merkle_root,
                    "Version": block.version,
                    "Size": (block.size/1024.0).toFixed(2)+" KB",
                    "Nonce": block.nonce,
                    "Difficulty": block.difficulty,
                    "Transactions": block.num_transactions,
                    "Total Fees": (block.total_fees / 100000000.0)+" BTC",
                    "Block Reward": (block.inflation / 100000000.0)+" BTC",
                }
            },
            meta: {
                sourceName: "Biteasy",
                sourceUrl: "https://www.biteasy.com/blockchain/blocks/" + block.hash
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