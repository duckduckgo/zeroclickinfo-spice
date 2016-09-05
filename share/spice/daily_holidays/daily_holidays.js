(function (env) {
    "use strict";

    env.ddg_spice_daily_holidays = function(api_result) {

        if (!api_result || api_result.error !== 'none') {
            return Spice.failed('daily_holidays');
        }


        DDG.require('moment.js', function() {
            Spice.add({
                id: 'daily_holidays',

                name: 'Answer',
                data: {
                    title: "Holidays for " + moment(api_result.date, 'MMDDYYYY').format('LL'),
                    list: api_result.holidays
                },
                meta: {
                    sourceName: 'Checkiday',
                    sourceUrl: 'http://www.checkiday.com/' + api_result.date
                },
                templates: {
                    group: 'list',
                    options: {
                        list_content: Spice.daily_holidays.content,
                        moreAt: true
                    }
                }
            });
        });
    };
}(this));
