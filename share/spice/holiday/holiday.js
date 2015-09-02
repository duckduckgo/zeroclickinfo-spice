(function (env) {
    "use strict";
    env.ddg_spice_holiday = function(api_result) {
        if(!api_result || !api_result.h || api_result.h.length === 0) {
            return Spice.failed('holiday');
        }
        var script = $('[src*="/js/spice/holiday/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/holiday\/([^\/]+)\/([^\/]+)/)[2],
            url = 'http://www.timeanddate.com',
            source = url + '/search/results.html?query=' + query;

        DDG.require('moment.js', function() {
            var meta_obj = {
                    itemType: "Holidays",
                    sourceName: 'timeanddate.com',
                },
                template_obj,
                normalize_fn,
                data;

            var events = api_result.h;

            // Filtering events
            // for "christmas" only show "Christmas Day" etc
            // add more to the list as needed
            var single_days = {
                'christmas': ['Christmas Day'],
                'easter': ['Easter Sunday', 'Easter Day']
            };
            var days = Object.keys(single_days);
            events = events.filter(function(item) {
                for (var i = 0; i < days.length; i++) {
                    if (query === days[i] && single_days[days[i]].indexOf(item.n) === -1) {
                        return false;
                    }
                };
                return true;
            })

            if (events.length == 0) {
                return Spice.failed('holiday');
            } else if (events.length == 1){
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

                    if (item.o.length > 1) {
                        next_date = item.o[1];
                        data['next_date'] = next_date.d;
                        data['next_date_states'] = DDG.strip_html(next_date.s);
                    }
                    return data;
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
                data = events;
                normalize_fn = function(item) {
                    var date = item.o[0],
                        subtitle = item.n;

                    if (date.s !== null) {
                        subtitle += ', observed in ' + DDG.strip_html(date.s) + '.';
                    }

                    return {
                        title: moment(date.d).format('dddd, MMM D, YYYY'),
                        subtitle: subtitle,
                        name: item.n,
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
