(function(env){
  "use strict";
  env.ddg_spice_aqi = function(api_result) {
    if (api_result.error || !api_result) {
      return Spice.failed('aqi');
    }

    var query = DDG.get_query();
    var zip = query.match(/\d{5}/);

    // Check if is array
    var results = [];
    if (!($.isArray(api_result))) {
      results = [api_result];
    } else {
      results = api_result;
    }

    var common_info = results[0];
    //todo: check if common info is valid for all data

    Spice.add({
      id: "aqi",
      name: "AQI",
      data: results,
      meta: {
        sourceName: "airnowapi.org",
        sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip,
        primaryText: 'Air Quality Indices for ' + common_info.ReportingArea + ', ' + common_info.StateCode,
        secondaryText: "Data as of " + common_info.DateObserved + ", " + common_info.HourObserved + ":00 " +  common_info.LocalTimeZone,
      },
      templates: {
        group: 'text',
        item: Spice.aqi.content,
        item_detail: false
      }
    });
  }

  Spice.registerHelper("AQI_ifCond", function(string1, string2, options) {
      return ((string1 === string2) ? options.fn(this) : options.inverse(this));
  });
}(this));
