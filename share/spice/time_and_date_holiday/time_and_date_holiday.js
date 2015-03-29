(function (env) {
	"use strict";
	env.ddg_spice_time_and_date_holiday = function(api_result) {
	    if(!api_result || !api_result.h || api_result.h.length === 0) {
			return Spice.failed('time_and_date_holiday');
	    }
	    var query = DDG.get_query(),
	        url = 'http://www.timeanddate.com',
			source = url + '/search/results.html?query=' + encodeURIComponent(query);

        if (api_result.h.length == 1){
            var holiday = api_result.h[0];

            if (holiday.d.length <= 0) {
                return Spice.failed('time_and_date_holiday');
            }

            // selecting the first date only as it's the closest

            Spice.add({
                id: 'time_and_date_holiday',
                name: 'Holidays',
                data: holiday,
                normalize: function(item) {
                    var date = item.d[0];
                    var next_date = '';

                    if (item.d.length > 1) {
                        next_date = item.d[1];
                    }

                    return {
                        title: date,
                        subtitle: item.n,
                        description: item.a,
                        next_date: next_date
                    };
                },
                meta: {
                    sourceName: 'timeanddate.com',
                    sourceUrl: url + holiday.u
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.time_and_date_holiday.singleday,
                        moreAt: true
                    }
                }
            });
        } else {
            Spice.add({
                id: 'time_and_date_holiday',
                name: 'Holidays',
                data: api_result.h,
                normalize: function(item) {
                    if (item.d.length <= 0) {
                        return Spice.failed('time_and_date_holiday');
                    }
                    var date = item.d[0];

                    return {
                        title: date,
                        subtitle: item.n,
                        description: item.a,
                        url: url + item.u,
                    };
                },
                meta: {
                    sourceName: 'timeanddate.com',
                    sourceUrl: source
                },
                templates: {
                    group: 'text',
                    detail: false,
                    variants: {
                        tileTitle: '1line',
                    },
                }
            });
        }
	};
}(this));
