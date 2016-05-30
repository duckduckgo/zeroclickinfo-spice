(function (env) {
    "use strict";
    env.ddg_spice_holiday = function(api_result) {
        
        if (!api_result || !api_result.h || api_result.h.length !== 1 || !api_result.h[0].o || api_result.h[0].o.length !== 1) {
            return Spice.failed('holiday');
        }

        var script = $('[src*="/js/spice/holiday/"]')[0];
        var query_matches = $(script).attr("src").match(/holiday\/([^\/]+)\/([^\/]+)\/(\d*)/);
        var country = query_matches[1];
        var query = query_matches[2];
        var year = query_matches[3];
        
        if (!year || !query || !country) {
            return Spice.failed('holiday');
        }
        
        DDG.require('moment.js', function() {                                  
            var holiday = api_result.h[0];
            
            // todo: only if user didn't explictly provide a year
            // If the holiday being queried for has already past in the given year requery for the following year
            //var eventDate = moment(new Date(data.o[0].d));
            //var currentDate = moment();
            //if (eventDate.isBefore(currentDate)) {
            //    $.getScript('/js/spice/holiday/' + country + '/' + query + '/' + eventDate.add(1, 'years').format('YYYY'));
            //    return;
            //}
            
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
