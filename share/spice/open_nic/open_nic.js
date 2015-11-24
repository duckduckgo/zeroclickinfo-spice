(function (env) {
    "use strict";
    env.ddg_spice_open_nic = function(api_result){

        if (!api_result) {
            return Spice.failed('open_nic');
        }

        // User's localization from the original query
        var script = $('[src*="/js/spice/open_nic/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/open_nic\/([^\/]*)/)[1];
        
        // User's preferred unit
        var userpref = DDG.settings.get('kaj');
        // Default unit
        var unit = 'km';

        // If the user prefers miles, we use miles
        // If the user prefers km, we use km
        if (typeof userpref != 'undefined' && userpref != -1) {
            if (userpref == 'u') {
                unit = 'miles';
            }
        }
        // If the user's preferences didn't define a preferred unit,
        // or if they were inaccessible, we use the user's localisation to chose the right unit.
        else if (query == 'US') {
            
            unit = 'miles';
        }
        
        // The Handlebarrs helper used to display the right measure
        // using the distance unit we determined just above
        Spice.registerHelper('ifunit', function(options) {
            if(unit == 'miles') {
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        });

        Spice.add({
            id: "open_nic",
            name: "DNS",
            data: {
                list: api_result
            },
            meta: {
                sourceName: "OpenNIC",
                sourceUrl: 'https://www.opennicproject.org'
            },
            templates: {
                group: 'list',
                options: {
                    list_content: Spice.open_nic.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
