(function (env) {
	"use strict";
	env.ddg_spice_time_and_date_holiday = function(api_result) {
	    if(!api_result || !api_result.h || api_result.h.length === 0) {
			return Spice.failed('time_and_date_holiday');
	    }
	    var query = DDG.get_query(),
	        url = 'http://www.timeanddate.com',
			source = url + '/search/results.html?query=' + encodeURIComponent(query);

        DDG.require('moment.js', function() {
            var meta_obj = {
                    itemType: "Holidays",
                    sourceName: 'timeanddate.com',
                },
                template_obj,
                normalize_fn,
                data;

            if (api_result.h.length == 1){
                data = api_result.h[0];

                if (data.d.length <= 0) {
                    return Spice.failed('time_and_date_holiday');
                }

                normalize_fn = function(item) {
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
                };

                meta_obj['sourceUrl'] = url + data.u;

                template_obj = {
                    group: 'text',
                    options: {
                        content: Spice.time_and_date_holiday.singleday,
                        moreAt: true
                    }
                };

            } else {
                data = api_result.h;
                normalize_fn = function(item) {
                    if (item.d.length <= 0) {
                        return Spice.failed('time_and_date_holiday');
                    }
                    var date = moment(item.d[0]).format('dddd, MMM D, YYYY');
                    return {
                        title: date,
                        subtitle: item.n,
                        description: item.a,
                        url: url + item.u,
                    };
                };
                meta_obj['sourceUrl'] = source;
                template_obj = {
                    group: 'text',
                    detail: false,
                    variants: {
                        tile: 'basic1',
                        tileTitle: '2line'
                    }
                };
            }

            Spice.add({
                id: 'time_and_date_holiday',
                name: 'Holidays',
                data: data,
                normalize: normalize_fn,
                meta: meta_obj,
                templates: template_obj
            });
        });
	};
}(this));
