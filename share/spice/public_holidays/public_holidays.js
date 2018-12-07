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
                // Get the list of states this holiday applies to
                var states = [];
                if (holiday.states) {
                    for (var i=0; i<holiday.states.length; ++i) {
                        states.push(holiday.states[i].name);
                    }
                }
                                
                // Some holidays are returned multiple times by the API with a differing set of states
                var knownHoliday = null;
                for (var i=0; i<data.holidays.length; ++i) {
                    if (holiday.id === data.holidays[i].id &&
                        holiday.date.iso === data.holidays[i].date &&
                        holiday.name === data.holidays[i].name) {                        
                        knownHoliday = data.holidays[i];
                        break;
                    }
                }
                
                // Extend the list of states if there's already an entry for this holiday, otherwise create a new one
                if (knownHoliday) {                    
                    knownHoliday.states = knownHoliday.states.concat(states);                           
                } else {
                    data.holidays.push({
                        id:     holiday.id,
                        name:   holiday.name,
                        date:   holiday.date.iso,                        
                        states: states
                    }); 
                }
            });
            
            // Convert the data collected into a human readable format before displaying
            $.each(data.holidays, function(index, holiday) {
                holiday.states.sort();
                holiday.states = holiday.states.join(", ");    
                holiday.date = moment(holiday.date).format('ddd Do MMM');
            });
            
            // holiday.urlid is of the form "<country>/<holiday>"
            var countryUrlId = api_result.holidays[0].urlid.match(/(.+)\/.*/)[1];            
            
            Spice.add({
                id: "public_holidays",            
                name: "Answer",
                signal: "high",
                data: data,

                meta: {
                    sourceName: "timeanddate.com",
                    sourceUrl: 'http://www.timeanddate.com/holidays/' + countryUrlId + "/" + year
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
