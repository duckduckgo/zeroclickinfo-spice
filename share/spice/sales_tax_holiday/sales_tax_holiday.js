(function (env) {
    "use strict";
    env.ddg_spice_sales_tax_holiday = function(api_result){
        console.log("API Result Header.status is "+api_result.header.status);
        console.log("Total tax holiday objects are "+api_result.taxHolidays.length);
        // Error checking
        if (!api_result 
         || (typeof api_result.header === 'undefined')
         || api_result.header.status !== "SUCCESS" 
         || !api_result.taxHolidays
         || (typeof api_result.taxHolidays === 'undefined')
         || api_result.taxHolidays.length < 1) {
            return Spice.failed('sales_tax_holiday');
        }

        // Display
        Spice.add({
            id: "snapcx_sales_tax_holiday",
            name: "Finance",
            data: api_result.taxHolidays,
            meta: {
                //itemType: "Results",
                //searchTerm: api_result.query,
                sourceName: "snapCX.io",
                sourceIcon: false,
                sourceIconUrl: "http://snapcx.io/favicon.ico",
                sourceUrl: "https://snapcx.io"
            },
            normalize: function(item) {
                var stateName   = item.stateName;
                var titleResult = stateName+" - "+"Sales Tax Holidays";
                console.log("Title is "+titleResult);

                if (item.dates && !(typeof item.dates === 'undefined')) {
                  var dates = item.dates;
                  var subtitleResult = "Dates: "+dates;
                }
                                
                if (item.taxHolidayItems && !(typeof item.taxHolidayItems === 'undefined')) {
                  var taxHolidayItems = item.taxHolidayItems;
                  var description = "Included items are ";
                  for (var i = 0; i < taxHolidayItems.length; i++) {
                      description += taxHolidayItems[i].description+"-"+taxHolidayItems[i].maximumPriceLimit;
                  }  
                }
                return {
                    title: titleResult,
                    subtitle: subtitleResult,
                    description: description                    
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
//                 },
//                 detail: false,
//                 item_detail: false
            }
        });
    }
}(this));