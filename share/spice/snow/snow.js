// Description:
// Tells you if it's snowing in your area.
//
// Dependencies:
// None.
//
// Commands:
// is it snowing? - tells you if it's snowing in your current location.

var nrio = function(api_result) {
    // Check for errors.
    if(!api_result || api_result.error || !api_result.location) {
        return;
    }

    // Get only the city.
    var getLocation = function() {
        if(api_result.location.indexOf(",") !== -1) {
            return api_result.location.substring(0, api_result.location.indexOf(","));
        }
        return api_result.location;
    };

    // Display the spice plug-in.
    Spice.render({
        data              : api_result,
        header1           : "Is it snowing in " + getLocation() + "?",
        force_big_header  : true,
        source_name       : "isitsnowingyet.org",
        source_url        : "http://isitsnowingyet.org/check?q=" + api_result.location,
        template_normal   : "snow"
    });
};