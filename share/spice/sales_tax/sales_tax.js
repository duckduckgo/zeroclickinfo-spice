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
        var stateName = decodeURIComponent(query[2]),
            apiObjectName,
            taxRate,
            titleResult,
            subtitleResult,
            statNameTmp

        // The API can return multiple rate results
        // Loop through results:
        // If the state name returned matches that of the state searched use the rate value
        for (var i = 0; i < api_result.rates.length; i++) {
            //Lowercase state names
            apiObjectName = api_result.rates[i].name.toLowerCase();
            statNameTmp = stateName.toLowerCase();
            
            if(apiObjectName == statNameTmp) {
               taxRate = api_result.rates[i].rate;
            // workaround washington d.c = district of columbia
            } else if(apiObjectName == "district of columbia" && statNameTmp == "washington d.c") {
                taxRate = api_result.rates[i].rate;
            }

        }

        // Fail if we have no rate (edge case)
        if (taxRate === undefined) {
            return Spice.failed('sales_tax');
        }

        // title and subtitle
        titleResult = taxRate+"%";
        subtitleResult = stateName+" - "+"State Tax"

        // Fix for sourceUrl washington d.c => washington-dc
        // clean stateName for use as sourceUrl
        stateName = stateName.replace(/\./,"").replace(/\s/,"-").toLowerCase();

        // Display
        Spice.add({
            id: "sales_tax",
            name: "Answer",
            data: titleResult,
            meta: {
                sourceName: "Avalara",
                sourceUrl: 'http://www.taxrates.com/state-rates/' + stateName
            },
            normalize: function(item) {
                return {
                    title: titleResult,
                    subtitle: subtitleResult
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
