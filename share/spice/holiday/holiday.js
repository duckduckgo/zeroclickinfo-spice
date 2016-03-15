(function (env) {
    "use strict";

    // No jQuery appending a timestamp when calling $.getScript().
    $.ajaxSetup({ cache: true });

    env.ddg_spice_holiday = function(api_result) {
        if(!api_result || !api_result.h) {
            return Spice.failed('holiday');
        }

        var script = $('[src*="/js/spice/holiday/"]')[0],
            query_matches = $(script).attr("src").match(/holiday\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(\d*)/),
            year = query_matches[4],
            query = query_matches[3],
            country = query_matches[2],
            tense = query_matches[1],
            url = 'http://www.timeanddate.com',
            source = url + '/search/results.html?query=' + query;

        // Retry with US if nothing is returned.
        if (api_result.h.length === 0) {
            if (country !== 'United%20States') {
                $.getScript('/js/spice/holiday/' + tense + '/United%20States/' + query + '/' + year);
            } else {
                return Spice.failed('holiday');
            }
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

            // Filtering events
            // for "christmas" only show "Christmas Day" etc
            // add more to the list as needed
            var single_days = {
                'christmas' : ['Christmas', 'Christmas Day'],
                'easter'    : ['Easter Sunday', 'Easter Day']
            };
            var days = Object.keys(single_days);
            events = events.filter(function(item) {
                for (var i = 0; i < days.length; i++) {
                    if (query === days[i] && single_days[days[i]].indexOf(item.n) === -1) {
                        return false;
                    }
                }
                // Check holiday name for relevancy, ignoring "day" and non-alpha characters (e.g. [.-'])
                if (DDG.stringsRelevant(DDG.strip_non_alpha(item.n), DDG.strip_non_alpha(query), ['day'], 2)){
                    return true;
                } else {
                    return false;
                }
            });

            if (events.length === 0) {
                return Spice.failed('holiday');
            }

            if (events.length === 1) {
                data = events[0];

                if (!data.o || data.o.length <= 0) {
                    return Spice.failed('holiday');
                }

                // If the event date is past in the current year and past tense
                // was used, requery for the previous year.  If the year is
                // specified let that trump tense.
                var event_date = moment(new Date(data.o[0].d));
                var current_date = moment();
                if ((tense === "was") && event_date.isAfter(current_date) && (year.length === 0)) {
                    $.getScript('/js/spice/holiday/' + tense + '/' + country + '/' + query + '/' + event_date.subtract(1, 'year').format('YYYY'));
                    return;
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

            } else {
                data = events;
                normalize_fn = function(item) {
                    var date = item.o[0],
                        subtitle = item.n;

                    if (date.s !== null) {
                        subtitle += ', observed in ' + DDG.strip_html(date.s) + '.';
                    }

                    return {
                        title: moment(new Date(date.d)).format('dddd, MMM D, YYYY'),
                        subtitle: subtitle,
                        name: item.n,
                        description: item.a,
                        url: url + item.u,
                    };
                };
                meta_obj.sourceUrl = source;
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
