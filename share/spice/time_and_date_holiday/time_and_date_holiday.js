(function (env) {
	"use strict";
	env.ddg_spice_time_and_date_holiday = function(api_result) {
	    if(!api_result || !api_result.h || api_result.h.length === 0) {
			return Spice.failed('time_and_date_holiday');
	    }
	    var query = DDG.get_query(),
	        url = 'http://www.timeanddate.com',
			source = url + '/search/results.html?query=' + encodeURIComponent(query);

		Spice.add({
	        id: 'time_and_date_holiday',
	        name: 'Holidays',
	        data: api_result.h,
			normalize: function(item) {
				return {
					title: item.n,
					description: item.a,
					image: item.p,
					url: url + item.u
				};
			},
			meta: {
				sourceName: 'timeanddate.com',
				sourceUrl: source
			},
			templates: {
				group: 'info',
				options: {
					content: Spice.time_and_date_holiday.info,
					moreAt: true
				}
			}
		});
	};
}(this));
