(function(env){
  "use strict";
  env.ddg_spice_aqi = function(api_result) {
    if (api_result.error) {
      return Spice.failed('aqi');
    }

    var query = DDG.get_query();
    var zip = query.match(/\d{5}/);

    var result = api_result;

    Spice.add({
      id: "aqi",
      name: "AQI",
      data: result,
      meta: {
        sourceName: "airnowapi.org",
        sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip
      },
      templates: {
        group: 'text',
        detail: false,
        item_detail: false,
        options:{
            footer: Spice.aqi.content,
            moreAt: true
        }
      },
      normalize: function(item) {
        return {
          title: item.ReportingArea + ", " + item.StateCode,
          subtitle: "Air Quality Index as of " + item.DateObserved + ", " + item.HourObserved + ":00 " +  item.LocalTimeZone
        };
      }
    });
  }

  Spice.registerHelper("AQI_ifCond", function(string1, string2, options) {
      return ((string1 === string2) ? options.fn(this) : options.inverse(this));
  });
}(this));
