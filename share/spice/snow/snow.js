// Description:
// Tells you if it's snowing in your area.
//
// Dependencies:
// None.
//
// Commands:
// is it snowing? - tells you if it's snowing in your current location.

var nrio = function(api_result) {
    if(!api_result || api_result.error || !api_result.location) {
        return;
    }

    var getLocation = function() {
        if(api_result.location.indexOf(",") !== -1) {
            return api_result.location.substring(0, api_result.location.indexOf(","));
        }
        return api_result.location;
    };

    Spice.render({
        data              : api_result,
        header1           : "Is it snowing in " + getLocation() + "?",
        force_big_header  : true,
        source_name       : "isitsnowingyet.org",
        source_url        : "http://isitsnowingyet.org/",
        template_normal   : "snow"
    });
};