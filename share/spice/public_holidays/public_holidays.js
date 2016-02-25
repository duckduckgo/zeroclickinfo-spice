(function (env) {
    "use strict";
    env.ddg_spice_public_holidays = function(api_result) {

        if ( !api_result || api_result.error || api_result.errors || !api_result.holidays || api_result.holidays.length === 0) {
            return Spice.failed('public_holidays');
        }

        var script = $('[src*="/js/spice/public_holidays/"]')[0];
        var source = $(script).attr("src");       
        var year = decodeURIComponent(source.match(/public_holidays\/[a-z]{2}\/([0-9]{4})\/[^\/]+/)[1]);
        var country = decodeURIComponent(source.match(/public_holidays\/[a-z]{2}\/[0-9]{4}\/([^\/]+)/)[1]);        
        
        if ( !year || !country ) {
            return Spice.failed('public_holidays');                
        }
        
        DDG.require('moment.js', function() {
            Spice.add({
                id: "public_holidays",            
                name: "Answer",            
                data: api_result,

                meta: {
                    sourceName: "timeanddate.com",
                    sourceUrl: 'http://www.timeanddate.com/holidays/'
                },

                normalize: function(data) {                
                    var result = {
                        title: "Public Holidays " + year,
                        subtitle: country,
                        record_data: {}
                    };

                    $.each(data.holidays, function() {                        
                        var label = moment(this.date.iso).format('ddd Do MMM');
                        result.record_data[label] = this.name;                     
                    });

                    return result;
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
