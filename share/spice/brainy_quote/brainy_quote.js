function ddg_spice_brainy_quote (api_result) {
    // Check if the result is a category search or not.
    // We'll know that if the author is specified in the JSON response.
    if(api_result.error || api_result.author) {
	return;
    }

    Spice.render({
         data              : api_result,
         force_big_header  : true,
         header1           : api_result.header1,
         source_name       : api_result.source_name, // More at ...
         source_url        : api_result.source_url,
         template_normal   : 'brainy_quote',
	 force_no_fold     : true
    });
}
