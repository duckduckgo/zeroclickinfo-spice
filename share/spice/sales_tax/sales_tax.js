(function (env) {
    "use strict";
    env.ddg_spice_sales_tax = function(api_result){

        // Error checking
        if (!api_result || api_result.rates.length === 0) {
            return Spice.failed('sales_tax');
        }

        // Query    ZIP   STATE
        // Example: 06101/Connecticut
        var script = $('[src*="/js/spice/sales_tax/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/sales_tax\/([^\/]+)\/([^\/]+)/);

        // Declare vars
        var stateName = query[2],
            apiObjectName,
            taxRate,
            titleResult

        // The API can return multiple rate results
        // Loop through results:
        // If the state name returned matches that of the state searched use the rate value
        for (var i = 0; i < api_result.rates.length; i++) {
            apiObjectName = api_result.rates[i].name;
            if(apiObjectName.toLowerCase() == stateName.toLowerCase() ) {
               taxRate = api_result.rates[i].rate;
            }
        }

        // Fail if we have no rate (edge case)
        if (taxRate === undefined) {
            return Spice.failed('sales_tax');
        }

        // If sales tax is 0 change the response text
        if(taxRate == 0) {
            titleResult = stateName+" does not levy a sales tax";
        } else {
            titleResult = "Sales tax for "+stateName+" is "+taxRate+"%";
        }
        
        // Display
        Spice.add({
            id: "sales_tax",
            name: "Answer",
            data: api_result,
            meta: {
                sourceName: "avalara.com",
                sourceUrl: 'http://salestax.avalara.com'
            },
            normalize: function(item) {
                return {
                    title: titleResult,
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    }
}(this));
