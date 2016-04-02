(function (env) {
    "use strict";
    env.ddg_spice_metar = function(api_result) {
        
        if (!api_result || api_result.Error) {
            return Spice.failed('metar');
        }    

        Spice.add({
            id: "metar",
            name: 'Weather',
            data: api_result,
            meta: {
                sourceName: "Aviation Weather REST API",
                sourceUrl: "http://avwx.rest"
            },
            normalize: function(item) {
                return {
                    title: item["Station"], 
                    description: item["Raw-Report"],
                    infoboxData: [
                        {label: "Time of Observation", 
                         value: formatDate(item["Time"])},
                        {label: "Wind", 
                         value: item["Translations"]["Wind"]},
                        {label: "Visibility", 
                         value: item["Translations"]["Visibility"]},
                        {label: "Clouds", 
                         value: item["Translations"]["Clouds"]},
                        {label: "Temperature", 
                        value: item["Translations"]["Temperature"]},
                        {label: "Dew Point", 
                        value: item["Translations"]["Dewpoint"]},
                        {label: "Altimeter", 
                         value: item["Translations"]["Altimeter"]},
                        {label: "Flight Rules", 
                         value: item["Flight-Rules"]}
                    ]
                };
            },
            templates: {
                group: 'info'
            }
        });
        
        function formatDate(t) {
            return ("Day " + t.substring(0, 2) + " at " 
                    + t.substring(2,4) + ':' + t.substring(4,6)
                    + " GMT-0");
        }
    };
}(this));
