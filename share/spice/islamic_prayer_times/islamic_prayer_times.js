(function (env) {
    "use strict";
    env.ddg_spice_islamic_prayer_times = function(api_result) {

        if (!api_result || api_result.error || api_result.status_code === 0 || !api_result.items) {
            return Spice.failed('islamic_prayer_times');
        }

        DDG.require('moment.js', function() {

            function setDst(time, dst) {
                return dst === 1 ? time.add(dst, 'hours') : time;
            }

            function tz(time, offset) {
                var clone = time.clone();
                clone.utcOffset(offset);
                clone.add(time.utcOffset() - clone.utcOffset(), 'minutes');
                return clone;
            }

            function getClosest(timings, offset, local) {
                var date = local.format('YYYY-MM-DD');
                if ('date_for' in timings) {
                    date = tz(moment.utc(timings.date_for + ' ' + offset, 'YYYY-MM-DD Z'), offset).format('YYYY-MM-DD');
                    delete timings.date_for;
                }
                for (var property in timings) {
                    if (timings.hasOwnProperty(property)) {
                        var time = tz(moment.utc(date + ' ' + timings[property] + ' ' + offset, 'YYYY-MM-DD hh:mm a Z'), offset);
                        if (local.diff(time) < 0) {
                            var min = {
                                diff: time.from(local),
                                title: DDG.capitalize(property)
                            };
                            return min;
                        }
                    }
                }
                return false;
            }

            function getInfoboxData(timings) {
                var infoboxData = [];
                for (var property in timings) {
                    if (timings.hasOwnProperty(property) && property !== "date_for") {
                        infoboxData.push({
                            label: DDG.capitalize(property),
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
                    var offset = parseInt(data.timezone),
                        dst    = parseInt(data.daylight),
                        local  = setDst(moment().utcOffset(offset), dst),
                        isha   = tz(moment.utc(data.items[0].date_for + ' ' + data.items[0].isha + ' ' + offset, 'YYYY-MM-DD hh:mm a Z'), offset),
                        index  = local.diff(isha) > 0 ? 1 : 0; // if isha, which is the last prayer in the day, is past, then get the results for tomorrow
                    return {
                        title: data.title,
                        datum: local.format('LLLL'),
                        infoboxData: getInfoboxData(data.items[index]),
                        closest: getClosest(data.items[index], offset, local),
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
