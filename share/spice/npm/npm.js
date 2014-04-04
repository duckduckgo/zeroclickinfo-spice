function ddg_spice_npm (api_result) {
	if (api_result.error) return

    Spice.add({
         data              : api_result,
         
         header1           : api_result.name + ' (' + api_result.version + ')',
         sourceName       : "npmjs.org", // More at ...
         sourceUrl        : 'http://npmjs.org/package/' + api_result.name,
         template_normal   : 'npm',
         template_small    : 'npm'
    });
}

