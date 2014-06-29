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
        var genesisDescription = "The genesis block is the first block of the Bitcoin block chain."+
                                 " Modern versions of Bitcoin assign it block number 0 "+
                                 "though older versions gave it number 1.";
        var blockDescription = "Data is permanently recorded in the " +
                               "Bitcoin network through files called " +
                               "blocks. A block is a record of some or " +
                               "all of the most recent Bitcoin transactions " +
                               "that have not yet been recorded in any prior " +
                               "blocks. They could be thought of like the " +
                               "individual pages of a city recorder's recordbook " +
                               "(where changes to title to real estate are recorded) " +
                               "or a stock transaction ledger."
        
        Spice.add({
            id: "bitcoin_block",
            name: "Bitcoin Block",
            data: block,
            meta: {
                sourceName: "biteasy.com",
                sourceUrl: "https://www.biteasy.com/blockchain/blocks/" + block.hash
            },
            normalize: function(item) {
                var infoboxData = [{
                    heading: 'Block Info'
                },{
                    label: "Height",
                    value: block.height
                },{
                    label: "Solved At",
                    value: formatDate(new Date(block.solved_at))
                },{
                    label: "No of transactions",
                    value: block.num_transactions
                },{
                    label: "Total Fees",
                    value: (block.total_fees / 100000000.0)+" BTC"
                },{
                    label: "Block Reward",
                    value: (block.inflation / 100000000.0)+" BTC"
                },{
                    label: "Previous Block",
                    value: (block.hash === genesisHash ? 'N/A' : block.previous_block)
                },{
                    label: "Merkle Root",
                    value: block.merkle_root
                },{
                    label: "Version",
                    value: block.version
                },{
                    label: "Size",
                    value: (block.size/1024.0).toFixed(2)+" KB"
                },{
                    label: "Nonce",
                    value: block.nonce
                },{
                    label: "Difficulty",
                    value: block.difficulty
                }];

                return {
                    description: (block.hash === genesisHash ? genesisDescription : blockDescription),
                    title: (block.hash === genesisHash ? 'Genesis Block' : 'Block #'+block.height),
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));