(function (env) {
    "use strict";
    env.ddg_spice_tides = function(api_result){
        if (!api_result || api_result.error || !api_result.tide) {
            return Spice.failed('tides');
        }

        var now = new Date().getTime() / 1000;
        var tides = $.grep(api_result.tide.tideSummary, function(i){
            //filtering out events that are not high/low tides or have already happened
            return !!i.data.height && i.date.epoch > now;
        });

        //is the tide rising or receding?
        var rising = tides[0].data.type == "High Tide";

        DDG.require('moment.js', function(){
        var tide_display = {};
        $.each(tides, function(i, v){
            //time: type and height
            var time = moment({y: v.date.year, M: v.date.mon - 1, d: v.date.mday, h: v.date.hour, m: v.date.min}).format('ddd h:mm A');
            tide_display[time] = v.data.type + ', ' + v.data.height;
        })

        Spice.add({
            id: "tides",
            name: "Tides",
            data: {
                title: rising ? 'Currently rising' : 'Currently receding',
                subtitle: 'Tides at ' + api_result.tide.tideInfo[0].tideSite,
                record_data: tide_display
            },
            meta: {
                sourceName: "WUnderground.com",
                sourceUrl: 'http://www.wunderground.com/'
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
