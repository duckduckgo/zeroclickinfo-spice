(function (env) {
    "use strict";
    env.ddg_spice_sales_tax_holiday = function(api_result){
        // Error checking
        var errorMessage = "UNKNOWN ERROR";
        var isError = false;
        var isMultipleResults = false;
        if (!api_result 
         || (typeof api_result.header === 'undefined')
         || api_result.header.status !== "SUCCESS" 
         || !api_result.taxHolidays
         || (typeof api_result.taxHolidays === 'undefined')
         || api_result.taxHolidays.length < 1) {
            if(api_result.header.errorMessage 
            && api_result.header.errorCode 
            && api_result.header.errorCode === 'NOT_FOUND') {
                isError = true;
                errorMessage = api_result.header.errorMessage;
            } else {         
              return Spice.failed('sales_tax_holiday');
            }
        }

        if (api_result.taxHolidays.length > 1) {
            isMultipleResults = true;
        }
        // Display
      DDG.require("moment.js", function(){
        Spice.add({
            id: "sales_tax_holiday",
            name: "Answer",
            data: isError? {"errorMessage" : errorMessage} : api_result.taxHolidays,
            meta: {
                sourceName: "snapCX",
                sourceIcon: false,
                sourceIconUrl: "http://snapcx.io/favicon.ico",
                sourceUrl: "https://snapcx.io/salesTax"
            },
            normalize: function(item) {
                var stateName   = item.stateName;
                if (!isError) {
                   var titleResult = stateName;
                   if (!isMultipleResults) {
                       titleResult += " - "+"Sales Tax Holidays";
                   } 
                } else {
                   var titleResult = item.errorMessage;
                }

                if (item.dates && !(typeof item.dates === 'undefined')) {
                  var dates = item.dates;
                  var subtitleResult = "";
                  for (var dt = 0; dt < dates.length; dt++) {
                      if (dt > 0) subtitleResult += ", ";
                      subtitleResult += moment(dates[dt]).format("MMM DD, YYYY"); 
                  }  
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
                },
                variants: {
                  tileSnippet: 'large'
                }            
            } //end of 'templates block
        }); //end of Spice.add(..)
      }); //end of moment.js dependency
    }
}(this));