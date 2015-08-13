(function (env) {
    "use strict";
    env.ddg_spice_islamic_prayer_times = function(api_result) {

        if (!api_result || api_result.error || api_result.status_code === 0 || !api_result.items) {
            return Spice.failed('islamic_prayer_times');
        }

        DDG.require('moment.js', function() {

            function capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function getClosest(timings, index) {
                var today = moment();
                for (var property in timings) {
                    if (timings.hasOwnProperty(property)) {
                        var time = moment(timings[property], 'hh:mm A').add('days', index);
                        if (today.diff(time) < 0) {
                            var min = {
                                diff: time.from(today),
                                title: capitalize(property)
                            };
                            return min;
                        }
                    }
                }
                return false;
            }

            function getInfoboxData(timings) {
                var infoboxData = [];
                if ('date_for' in timings) delete timings.date_for; // remove the unnecessary one
                for (var property in timings) {
                    if (timings.hasOwnProperty(property)) {
                        infoboxData.push({
                            label: capitalize(property),
                            value: timings[property]
                        });
                    }
                }
                return infoboxData;
            }

            Spice.add({
                id: "islamic_prayer_times",
                name: "Islamic Prayer Times",
                data: api_result,
                meta: {
                    sourceName: "Muslim Salat",
                    sourceUrl: api_result.link
                },
                normalize: function(data) {
                    console.log(data);
                    // if isha, which is the last prayer in the day, is past, then get results for tomorrow
                    var index = moment().diff(moment(data.items[0].isha, 'hh:mm A')) > 0 ? 1 : 0;
                    return {
                        title: data.title,
                        datum: moment(data.items[index].date_for, 'YYYY-MM-DD').format('LL'),
                        infoboxData: getInfoboxData(data.items[index]),
                        closest: getClosest(data.items[index], index),
                        qibla: data.qibla_direction
                    };
                },
                templates: {
                    group: 'info',
                    options: {
                        content: Spice.islamic_prayer_times.islamic_prayer_times,
                        moreAt: false
                    }
                }
            });

        });
    };
}(this));
