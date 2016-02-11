(function (env) {
    "use strict";
    env.ddg_spice_sales_tax = function(api_result){
        console.log("API Result Header.status is "+api_result.header.status);
        console.log("Total infos object are "+api_result.stateSalesTaxInfos.length);
        // Error checking
        if (!api_result || api_result.header.status !== "SUCCESS") {
            return Spice.failed('sales_tax2');
        }

        // Display
        Spice.add({
            id: "sales_tax",
            name: "Finance",
            data: api_result.stateSalesTaxInfos,
            meta: {
                //itemType: "Results",
                //searchTerm: api_result.query,
                sourceName: "snapCX.io",
                sourceIcon: false,
                sourceIconUrl: "http://snapcx.io/favicon.ico",
                sourceUrl: "https://snapcx.io"
            },
            normalize: function(item) {
                var stateName, titleResult, subtitleResult, minTaxRate, maxTaxRate, noTaxState;

                stateName   = item.stateName;
                minTaxRate  = (item.minimumTaxRate * 100).toFixed(2) +"%";
                maxTaxRate  = (item.maximumTaxRate * 100).toFixed(2) +"%";
                noTaxState  = item.noTaxState;
                titleResult = stateName+" - "+"Sales Tax";
                console.log("Title is "+titleResult);

                if (noTaxState === false) {
                    if (minTaxRate === maxTaxRate) {
                        subtitleResult = "Sales Tax is "+minTaxRate;
                    } else {
                        subtitleResult = "Sale Tax ranges from "+minTaxRate+" to "+maxTaxRate;
                    }
                } else {
                    subtitleResult = "No sales tax for this state";
                }
                return {
                    title: titleResult,
                    description: subtitleResult                    
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true                    
                },
                detail: false,
                item_detail: false
            }
        });
    }
}(this));