(function (env) {
    "use strict";
    env.ddg_spice_sales_tax_holiday = function (api_result) {

        if (!api_result || !api_result.header || api_result.header.status !== "SUCCESS" ) {
            return Spice.failed('sales_tax_holiday');
        }

        if (api_result.taxHolidays.length > 1 ) {
            return Spice.failed('sales_tax_holiday');
        }

        DDG.require("moment.js", function () {

            Spice.add({
                id: "sales_tax_holiday",
                name: "Answer",
                data: api_result.taxHolidays[0] || api_result.header,
                meta: {
                    sourceName: "snapCX",
                    sourceUrl: "https://snapcx.io/salesTax"
                },
                normalize: function (item) {

                    var stateName = item.stateName,
                        year = moment().year(),
                        titleResult = stateName + " - " + year + " Sales Tax Holidays";

                    if (item.dates.length) {
                        var dateMap = {};
                        $.each(item.dates, function() {
                            var obj = moment(this),
                                m = obj.format("MMM"),
                                d = obj.format("D");

                            if (dateMap[m]){
                                dateMap[m].push(d);
                            } else {
                                dateMap[m] = [d];
                            }
                        });

                        var dateSub = [];
                        $.each(dateMap, function(k, v){
                            var datesString = k + " " + v.join(", ");
                            dateSub.push(datesString);
                        });
                    }

                    if (item.taxHolidayItems.length) {
                        var record_data = {};
                        $.each(item.taxHolidayItems, function() {
                            if (this.maximumPriceLimit && this.maximumPriceLimit > 0.0){
                                record_data[this.description] = "$" + this.maximumPriceLimit;
                            } else {
                                record_data[this.description] = "Not Defined";
                            }
                        });
                    }

                    return {
                        title: titleResult,
                        subtitle: dateSub,
                        record_data: record_data
                    };
                },
                templates: {
                    group: 'list',
                    options: {
                        moreAt: true,
                        content: "record"
                    }
                }
            });
        });
    }
}(this));