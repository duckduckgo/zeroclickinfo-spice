(function (env) {
    "use strict";
    env.ddg_spice_sales_tax_holiday = function(api_result){
        // Error checking
        var errorMessage = "UNKNOWN ERROR";
        var isError = false;
        if (!api_result 
         || (typeof api_result.header === 'undefined')
         || api_result.header.status !== "SUCCESS" 
         || !api_result.taxHolidays
         || (typeof api_result.taxHolidays === 'undefined')
         || api_result.taxHolidays.length < 1) {
            isError = true;
            if (api_result.header && api_result.header.errorMessage) {
                errorMessage = api_result.header.errorMessage;
            } else {         
              return Spice.failed('sales_tax_holiday');
            }
        }

        // Display
        Spice.add({
            id: "snapcx_sales_tax_holiday",
            name: "Finance",
            data: isError? {"errorMessage" : errorMessage} : api_result.taxHolidays,
            meta: {
                sourceName: "snapCX.io",
                sourceIcon: false,
                sourceIconUrl: "http://snapcx.io/favicon.ico",
                sourceUrl: "https://snapcx.io"
            },
            normalize: function(item) {
                var stateName   = item.stateName;
                if (!isError) {
                   var titleResult = stateName+" - "+"Sales Tax Holidays";
                } else {
                   var titleResult = item.errorMessage;
                }

                if (item.dates && !(typeof item.dates === 'undefined')) {
                  var dates = item.dates;
                  var subtitleResult = "Dates: "+dates;
                }
                                
                if (item.taxHolidayItems && !(typeof item.taxHolidayItems === 'undefined')) {
                  var taxHolidayItems = item.taxHolidayItems;
                  var description = "Included items are ";
                  for (var i = 0; i < taxHolidayItems.length; i++) {
                      if (i > 0) description += ", ";
                      description += taxHolidayItems[i].description;
                      if (!(typeof taxHolidayItems[i].maximumPriceLimit === 'undefined') && taxHolidayItems[i].maximumPriceLimit > 0.0 
                         )
                      description += "-$"+taxHolidayItems[i].maximumPriceLimit;
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
            }
        });
    }
}(this));