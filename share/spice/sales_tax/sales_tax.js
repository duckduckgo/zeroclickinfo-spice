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
                sourceName: "Wikipedia",
                sourceUrl: "https://en.wikipedia.org/wiki/Sales_taxes_in_the_United_States#By_jurisdiction"
            },
            normalize: function(item) {
                var stateName, titleResult, subtitleResult, minTaxRate, maxTaxRate, noTaxState;

                stateName   = item.stateName;
                minTaxRate  = (item.minimumTaxRate * 100).toFixed(2) +"%";
                maxTaxRate  = (item.maximumTaxRate * 100).toFixed(2) +"%";
                noTaxState  = item.noTaxState;
                subtitleResult = stateName+" - Sales Tax";

                if (noTaxState === false) {
                    if (minTaxRate === maxTaxRate) {
                        titleResult = minTaxRate;
                    } else {
                        titleResult = minTaxRate+" to "+maxTaxRate;
                    }
                } else {
                    titleResult = "No sales tax";
                }
                return {
                    title: titleResult,
                    subtitle: subtitleResult
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
           }
        });
    }
}(this));