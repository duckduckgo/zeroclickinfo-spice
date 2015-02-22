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

    var data = {
      common_info: results[0],
      aqi_measurements: results
    };

    Spice.add({
      id: "aqi",
      name: "AQI",
      data: data,
      meta: {
        sourceName: "airnowapi.org",
        sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip,
      },
      normalize: function(item){
        return {
          title: 'Air Quality Indices for ' + item.common_info.ReportingArea + ', ' + item.common_info.StateCode,
          //subtitle: "Data as of " + item.common_info.DateObserved + ", " + item.common_info.HourObserved + ":00 " +  item.common_info.LocalTimeZone
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

  Spice.registerHelper("aqi_help_link", function(string1, options) {
    if (string1 == "PM2.5" || string1 == "PM10")
      return "http://www.airnow.gov/index.cfm?action=aqibasics.particle"
    else if (string1 == "O3")
      return "http://www.airnow.gov/index.cfm?action=pubs.aqiguideozone"
    else
      return "http://www.airnow.gov/index.cfm?action=aqibasics.aqi"

  });

}(this));
