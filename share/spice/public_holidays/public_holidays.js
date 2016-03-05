(function (env) {
    "use strict";
    env.ddg_spice_public_holidays = function(api_result) {

        if (!api_result || api_result.error || api_result.errors || !api_result.holidays || api_result.holidays.length === 0) {
            return Spice.failed('public_holidays');
        }

        var script = $('[src*="/js/spice/public_holidays/"]')[0];
        var source = $(script).attr("src");       
        var year = decodeURIComponent(source.match(/public_holidays\/[a-z]{2}\/([0-9]{4})\/[^\/]+/)[1]);
        var country = decodeURIComponent(source.match(/public_holidays\/[a-z]{2}\/[0-9]{4}\/([^\/]+)/)[1]);        
        
        if (!year || !country) {
            return Spice.failed('public_holidays');                
        }

        DDG.require('moment.js', function() {
            var data = {
                title: "Public Holidays " + year, 
                subtitle: country,
                holidays: []
            };
            
            $.each(api_result.holidays, function(index, holiday) {
                // Some holidays only apply to certain provinces
                var provinces = [];
                if (holiday.states) {                    
                    for (var i=0; i<holiday.states.length; ++i) {
                        provinces.push(holiday.states[i].name);
                    }
                }
                
                data.holidays.push({
                    name:  holiday.name,
                    date:  moment(holiday.date.iso).format('ddd Do MMM'),
                    notes: provinces.join(", ")
                });
            });
            
            Spice.add({
                id: "public_holidays",            
                name: "Answer",
                data: data,

                meta: {
                    sourceName: "timeanddate.com",
                    sourceUrl: 'http://www.timeanddate.com/holidays/'
                },

                templates: {
                    group: 'list',
                    options: {
                        content: DDH.public_holidays.record,
                        moreAt: true
                    }
                }
            });
        });
    };
}(this));
