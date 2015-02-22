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
    if (($.isArray(api_result))) {
      results = api_result;
    } else {
      results = [api_result];
    }

    var first_item = results[0];

    var data_item = [{
      title: 'Air Quality Indices for ' + first_item.ReportingArea + ', ' + first_item.StateCode,
      subtitle: "Data as of " + first_item.DateObserved + ", " + first_item.HourObserved + ":00 " +  first_item.LocalTimeZone,
      aqi_measurements: results
    }];

    Spice.add({
      id: "aqi",
      name: "AQI",
      data: data_item,
      meta: {
        sourceName: "airnowapi.org",
        sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip,
      },
      normalize: function(item){
        return {
          title: item.title,
          subtitle: item.subtitle
        };
      },
      templates: {
        group: 'text',
        item: false,
        options: {
          content: Spice.aqi.content,
          moreAt: true
        }
      }
    });
  }

  Spice.registerHelper("aqi_circle_category", function(string1, options) {
    if (string1 == "Good")
      return "good";
    else if (string1 == "Moderate")
      return "moderate";
    else if (string1 == "Unhealthy for Sensitive Groups")
      return "usg";
    else if (string1 =="Unhealthy")
      return "unhealthy";
    else if (string1 == "Very Unhealty")
      return "very_unhealthy";
    else
      return "hazardous";
  });
}(this));
