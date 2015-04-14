(function (env) {
	"use strict";
	env.ddg_spice_holiday = function(api_result) {
	    if(!api_result || !api_result.h || api_result.h.length === 0) {
			return Spice.failed('holiday');
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

                if (!data.o || data.o.length <= 0) {
                    return Spice.failed('holiday');
                }

                normalize_fn = function(item) {
                    var date = item.o[0],
                        next_date,
                        subtitle = item.n;

                    if (item.o.length > 1) {
                        next_date = item.o[1];
                    }

                    if (date.s !== null) {
                        subtitle += ', Observed in ' + DDG.strip_html(date.s);
                    }

                    return {
                        title: date.d,
                        subtitle: subtitle,
                        description: item.a,
                        next_date: next_date.d
                    };
                };

                meta_obj['sourceUrl'] = url + data.u;

                template_obj = {
                    group: 'text',
                    options: {
                        content: Spice.holiday.singleday,
                        moreAt: true
                    }
                };

            } else {
                data = api_result.h;
                normalize_fn = function(item) {
                    if (item.o.length <= 0) {
                        return Spice.failed('holiday');
                    }

                    var date = item.o[0],
                        subtitle = item.n;

                    if (date.s !== null) {
                        subtitle += ', Observed in ' + DDG.strip_html(date.s);
                    }

                    return {
                        title: moment(date.d).format('dddd, MMM D, YYYY'),
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
                id: 'holiday',
                name: 'Holidays',
                data: data,
                normalize: normalize_fn,
                meta: meta_obj,
                templates: template_obj
            });
        });
	};
}(this));
