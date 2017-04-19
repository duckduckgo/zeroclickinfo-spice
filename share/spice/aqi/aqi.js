(function(env){
  "use strict";
  env.ddg_spice_aqi = function(api_result) {
    if (!api_result || api_result.length === 0) {
      return Spice.failed('aqi');
    }

    var zip = DDG.get_query().match(/\d{5}/);

    // Make array if it is not
    var results = [];
    if (($.isArray(api_result))) {
      results = api_result;
    } else {
      results = [api_result];
    }

    // Extract common info from first result
    var locationString = results[0].ReportingArea + ', ' + results[0].StateCode;

    Spice.add({
      id: "aqi",
      name: "Air Quality Index",
      data: {
        list: results
      },
      meta: {
        sourceName: "airnowapi.org",
        sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip,
      },
      signal: 'high',
      normalize: function(item){
        return {
          title: locationString,
          //subtitle: "Data as of " + item.common_info.DateObserved + ", " + item.common_info.HourObserved + ":00 " +  item.common_info.LocalTimeZone
        };
      },
      templates: {
        group: 'list',
        options: {
          list_content: Spice.aqi.list_content,
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
