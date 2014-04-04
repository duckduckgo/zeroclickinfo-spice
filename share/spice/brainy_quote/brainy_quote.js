function ddg_spice_brainy_quote (api_result) {
    // Check if the result is a category search or not.
    // We'll know that if the author is specified in the JSON response.
    if(api_result.error || api_result.author) {
	return;
    }

    Spice.add({
         data              : api_result,
         
         header1           : api_result.header1,
         sourceName       : api_result.sourceName, // More at ...
         sourceUrl        : api_result.sourceUrl,
         template_normal   : 'brainy_quote',
	 
    });
}
