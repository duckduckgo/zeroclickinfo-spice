(function (env) {
    "use strict";

    // As we are using UTC that does not change with the change of seasons,
    // we need to check DST as local time or civil time may change if a time zone jurisdiction observes daylight saving time or summer time
    function setDst(time, dst) {
        return dst === 1 ? time.add(dst, 'hours') : time;
    }

    // Timezones can't be changed directly within the core moment.js library
    // However, we can change timezones using the UTC offsets as the API provides it.
    function tz(time, offset) {
        var clone = time.clone();
        return clone.utcOffset(offset).add(time.utcOffset() - clone.utcOffset(), 'minutes');
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
                        time: time,
                        diff: time.from(local),
                        title: DDG.capitalize(property)
                    };
                    return min;
                }
            }
        }
        return false;
    }

    function getList(timings) {
        var list = [];
        for (var property in timings) {
            if (timings.hasOwnProperty(property) && property !== "date_for") {
                // Some prayer times can't be calculated because of the BIGINT maximum value is exceeded within the API,
                // times should be checked whether they are valid or not
                var valid_formats = ["h:mm A", "h:mm a"];
                if (moment(timings[property], valid_formats, true).isValid()) {
                    list[DDG.capitalize(property)] = timings[property].toUpperCase();
                }
            }
        }
        return list;
    }

    function setFormat(closest, index) {
        return index === 0 ? closest.format('h:mm A') : closest.format('h:mm A, MMM D ') + '(Tomorrow)';
    }

    function setAddress(title, country_code, country, state, city, address) {
        var location = city !== "" ? city + ", " : "";
        if (country_code === "US") {
            location += state;
            return location;
        }
        return address !== "" ? address : (location !== "" ? location + country : (title !== "" ? title : (state !== "" ? state + ", " : "") + country));
    }

    env.ddg_spice_islamic_prayer_times = function(api_result) {

        if (!api_result || api_result.error || api_result.status_code === 0 || !api_result.items) {
            return Spice.failed('islamic_prayer_times');
        }

        DDG.require('moment.js', function() {

            Spice.add({
                id: "islamic_prayer_times",
                name: "Islamic Prayer Times",
                data: api_result,
                meta: {
                    sourceName: "Muslim Salat",
                    sourceUrl: DDG.toHTTPS(api_result.link)
                },
                normalize: function(data) {
                    var offset  = parseInt(data.timezone),
                        dst     = parseInt(data.daylight),
                        local   = setDst(moment().utcOffset(offset), dst),
                        isha    = tz(moment.utc(data.items[0].date_for + ' ' + data.items[0].isha + ' ' + offset, 'YYYY-MM-DD hh:mm a Z'), offset),
                        index   = local.diff(isha) > 0 ? 1 : 0, // if isha, which is the last prayer in the day, is past, then get the results for tomorrow
                        closest = getClosest(data.items[index], offset, local);
                    return {
                        title: closest.title + ' at ' +  setFormat(closest.time, index),
                        subtitle: 'Next prayer time at ' + setAddress(data.title, data.country_code, data.country, data.state, data.city, data.address),
                        record_data: getList(data.items[index])
                    };
                },
                templates: {
                    group: 'list',
                    options: {
                        content: 'record',
                        moreAt: true
                    }
                }
            });

        });
    };
}(this));
