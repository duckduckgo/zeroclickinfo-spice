(function (env) {
    "use strict";
    env.ddg_spice_sales_tax = function(api_result){
        // Error checking
        if (!api_result || api_result.header.status !== "SUCCESS") {
            return Spice.failed('sales_tax');
        }

        // Display
        Spice.add({
            id: "sales_tax",
            name: "Answer",
            data: api_result.stateSalesTaxInfos,
            meta: {
                //itemType: "Results",
                //searchTerm: api_result.query,
                sourceName: "Wikipedia",
                //sourceIcon: false,
                //sourceIconUrl: "http://snapcx.io/favicon.ico",
                sourceUrl: "https://en.wikipedia.org/wiki/Sales_taxes_in_the_United_States#By_jurisdiction"
            },
            normalize: function(item) {
                var stateName, titleResult, subtitleResult, minTaxRate, maxTaxRate, noTaxState;

                stateName   = item.stateName;
                minTaxRate  = (item.minimumTaxRate * 100).toFixed(2) +"%";
                maxTaxRate  = (item.maximumTaxRate * 100).toFixed(2) +"%";
                noTaxState  = item.noTaxState;
                titleResult = stateName;
                //console.log("Title is "+titleResult);

                if (noTaxState === false) {
                    if (minTaxRate === maxTaxRate) {
                        subtitleResult = "Sales Tax is "+minTaxRate;
                    } else {
                        subtitleResult = "Sale Tax ranges from "+minTaxRate+" to "+maxTaxRate;
                    }
                } else {
                    subtitleResult = "No sales tax";
                }
                return {
                    title: titleResult,
                    description: subtitleResult                    
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true,
                    moreText: { 
                      href: 'https://snapcx.io/salesTax', 
                      text: 'Data by snapCX' 
                    }

                },
                 variants: {
                  tileSnippet: 'small'
                }   
                //detail: false,
                //item_detail: false
            }
        });
    }
}(this));