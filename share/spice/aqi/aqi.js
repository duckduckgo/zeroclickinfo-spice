(function(env){
    "use strict";
    env.ddg_spice_aqi = function(api_result) {
        if (api_result.error) {
            return Spice.failed('aqi');
        }

        var query = DDG.get_query();
        var zip = query.match(/\d{5}/);

        Spice.add({
            id: "aqi",
            name: "AQI",
            data: api_result,
            meta: {
                sourceName: "airnowapi.org",
                sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false
            },
            normalize : function(item){
                return{
                    title: item.ParameterName + ": " + item.AQI + " (" + item.Category.Name + ")",
                    subtitle: item.ReportingArea + ", " + item.StateCode,
                    description: item.DateObserved + ", " + item.HourObserved + ":00 " + item.LocalTimeZone
                }
            }
        })
    }
}(this));
