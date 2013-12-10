function nrio (api_result) {
    // Check for errors.
    if(!api_result || api_result.error || !api_result.location) {
        return;
    }

    // Get only the city.
    var location = decodeURIComponent(api_result.location),
        index = location.indexOf(",");

    if (index !== -1) {
        location = location.substring(0, index);
    }

    location = location.charAt(0).toUpperCase() + location.slice(1);

    // Display the spice plug-in.
    Spice.render({
        data              : api_result,
        header1           : "Is it snowing in " + location + "?",
        force_big_header  : true,
        source_name       : "isitsnowingyet.org",
        source_url        : "http://isitsnowingyet.org/check?q=" + api_result.location,
        template_normal   : "snow",
        force_no_favicon  : true
    });
};
