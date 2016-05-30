(function (env) {
    "use strict";
    env.ddg_spice_holiday = function(api_result) {
        
        if (!api_result || !api_result.h || api_result.h.length === 0 || api_result.h.length !== 1) {
            return Spice.failed('holiday');
        }

        var script = $('[src*="/js/spice/holiday/"]')[0];
        var query_matches = $(script).attr("src").match(/holiday\/([^\/]+)\/([^\/]+)\/(\d*)/);
        var country = query_matches[1];
        var query = query_matches[2];
        var year = query_matches[3];
        var url = 'http://www.timeanddate.com';
        var source = url + '/search/results.html?query=' + query;

        if (!year || !query || !country) {
            return Spice.failed('holiday');
        }
        
        DDG.require('moment.js', function() {
            var meta_obj = {
                    itemType: "Holidays",
                    sourceName: 'timeanddate.com',
                },
                template_obj,
                normalize_fn,
                data;

            var events = api_result.h;
            data = events[0];

            if (!data.o || data.o.length <= 0) {
                 return Spice.failed('holiday');
            }

            normalize_fn = function(item) {
                var date = item.o[0],
                    next_date = null,
                    subtitle = item.n;
                
                if (date.s !== null) {
                    subtitle += ', observed in ' + DDG.strip_html(date.s) + '.';
                }
                
                var data = {
                    title: date.d,
                    subtitle: subtitle,
                    name: item.n,
                    description: item.a,
                };
                
                return data;
            };

            meta_obj.sourceUrl = url + data.u;

            template_obj = {
                group: 'text',
                options: {
                    moreAt: true
                }
            };
            
            Spice.add({
                id: 'holiday',
                name: 'Answer',
                data: data,
                normalize: normalize_fn,
                meta: {meta_obj},
                templates: template_obj
            });
        });
    };
}(this));
