(function (env) {
    "use strict";
    env.ddg_spice_holiday = function(api_result) {
        
        if (!api_result || !api_result.h || api_result.h.length < 1 || !api_result.h[0].o) {
            return Spice.failed('holiday');
        }

        var script = $('[src*="/js/spice/holiday/"]')[0];
        var query_matches = $(script).attr("src").match(/holiday\/([^\/]+)\/([^\/]+)\/(\d*)\/(\d)/);
        var country = query_matches[1];
        var query = query_matches[2];
        var year = query_matches[3];
        var userSpecifiedYear = query_matches[4] == 1 ? true : false;
        
        if (!year || !query || !country) {
            return Spice.failed('holiday');
        }
        
        DDG.require('moment.js', function() {
            /* The API may return multiple results for a given holiday (eg: when it spans multiple days).
             * This IA only displays the first entry on the assumption that this is the start date.
             */
            var holiday = api_result.h[0];

            if (!userSpecifiedYear) {
                // If the holiday being queried for has already past in the given year requery for the following year
                var currentDate = moment();
                var holidayDate = moment(holiday.o[0].d);
                if (currentDate.isAfter(holidayDate)) {                    
                    $.getScript('/js/spice/holiday/' + country + '/' + query + '/' + holidayDate.add(1, 'years').format('YYYY') + '/0');
                    return;
                }                    
            }
            
            var data = {
                title: holiday.o[0].d,
                subtitle: holiday.n,
                name: holiday.n,
                description: holiday.a 
            };

            if (holiday.o[0].s !== null) {
                data.subtitle += ', observed in ' + DDG.strip_html(holiday.o[0].s) + '.';
            }
            
            Spice.add({
                id: 'holiday',
                name: 'Answer',
                data: data,
                
                meta: {
                    sourceName: 'timeanddate.com',
                    sourceUrl: 'http://www.timeanddate.com' + holiday.u
                },

                templates: {
                    group: 'text',
                    options: {
                        moreAt: true
                    }
                }
            });
        });
    };
}(this));
