(function (env) {
    "use strict";
    env.ddg_spice_islamic_prayer_times = function(api_result){

        if (!api_result || api_result.error || api_result.code != 200 || !api_result.data) {
            return Spice.failed('islamic_prayer_times');
        }

        DDG.require('moment.js', function() {

            function getClosest(timings, timestamp) {
                var today = moment();
                for(var property in timings) {
                    if(timings.hasOwnProperty(property)) {
                        var time = timings[property].split(':');
                        today.hour(time[0]).minute(time[1]);
                        if(today.diff(moment.unix(timestamp)) > 0) {
                            var min = {
                                diff: today.from(moment.unix(timestamp)),
                                title: property
                            };
                            return min;
                        }
                    }
                }
                return false;
            }

            function getInfoboxData(timings) {
                var infoboxData = [];
                for(var property in timings) {
                    if(timings.hasOwnProperty(property)) {
                        infoboxData.push({
                            label: property,
                            value: timings[property]
                        });
                    }
                }
                return infoboxData;
            }

            Spice.add({
                id: "islamic_prayer_times",
                name: "Islamic Prayer Times",
                data: api_result.data,
                meta: {
                    sourceName: "Aladhan",
                    sourceUrl: "aladhan.com"
                },
                normalize: function(item) {
                    return {
                        title: moment(item.date.readable).format('LL'),
                        infoboxData: getInfoboxData(item.timings),
                        closest: getClosest(item.timings, item.date.timestamp)
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
