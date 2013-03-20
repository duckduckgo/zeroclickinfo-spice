
var ddg_spice_npm = function(api_result) {

	if (!api_result.error) { // If there's an error (such as if the package is not found), this won't be called
        console.log("npm x spice");

        Spice.render({
             data              : api_result,
             force_big_header  : true,
             header1           : api_result.name + ' (' + api_result.version + ')',
             source_name       : "npmjs.org", // More at ...
             source_url        : 'http://npmjs.org/package/' + api_result.name,
             template_normal   : 'npm',
             template_small    : 'npm'
        });

    }
}

