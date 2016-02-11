(function (env) {
   "use strict";
   env.ddg_spice_sales_tax_zip_code = function(api_result){
     console.log("API Result is "+api_result);     
     // Error checking
     if (!api_result 
      || !api_result.header
      || api_result.header.status !== "SUCCESS"
      || !api_result.salesTaxInfo) {
        if (api_result.header && api_result.header.errorMessage) {
            return Spice.failed(api_result.header.errorMessage); 
        }          
        return Spice.failed('sales_tax_zip_code');
      }

        // Display
        Spice.add({
            id: "sales_tax_zip_code",
            name: "Finance",
            data: api_result.salesTaxInfo,
            meta: {
                //itemType: "Results",
                //searchTerm: api_result.query,
                sourceName: "snapCX.io",
                sourceIcon: false,
                sourceIconUrl: "http://snapcx.io/favicon.ico",
                sourceUrl: "https://snapcx.io"
            },
            normalize: function(item) {
                var titleResult, subtitleResult, description;
                var totalTaxRate, stateTaxRate, countyTaxRate, cityTaxRate, messages;

                totalTaxRate   = (item.totalTaxRate * 100).toFixed(2);
                stateTaxRate   = (item.stateTaxRate * 100).toFixed(2);
                countyTaxRate  = (item.countyTaxRate * 100).toFixed(2);
                cityTaxRate    = (item.cityTaxRate * 100).toFixed(2);
                messages       = item.messages;

                titleResult = "Total tax is "+totalTaxRate+"%";
                console.log("Title is "+titleResult);
                if (totalTaxRate === 0.00) {
                    subtitleResult = "No sales tax for this state";
                } else {
                    subtitleResult = "Total("+totalTaxRate+"%) = State("+stateTaxRate+"%) + County("+countyTaxRate+"%) + City("+cityTaxRate+"%)";
                }

                return {
                    title: titleResult,
                    subtitle: subtitleResult,
                    description: messages                    
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