(function (env) {
    "use strict";
    env.ddg_spice_islamic_prayer_times = function(api_result){

        if (!api_result || api_result.error || api_result.status_code === 0 || !api_result.items) {
            return Spice.failed('islamic_prayer_times');
        }

        DDG.require('moment.js', function() {

            function capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function getClosest(timings) {
                var today = moment();
                for (var property in timings) {
                    if (timings.hasOwnProperty(property)) {
                        var time = moment(timings[property], 'hh:mm A');
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
                    return {
                        title: data.title,
                        datum: moment(data.items[0].date_for, 'YYYY-MM-DD').format('LL'),
                        infoboxData: getInfoboxData(data.items[0]),
                        closest: getClosest(data.items[0])
                    };
                },
                templates: {
                    group: 'info',
                    options: {
                        content: Spice.islamic_prayer_times.islamic_prayer_times,
                        moreAt: true
                    }
                }
            });

        });
    };
}(this));
