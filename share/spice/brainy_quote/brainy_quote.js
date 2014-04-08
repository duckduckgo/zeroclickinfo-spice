function ddg_spice_brainy_quote (api_result) {
    "use strict";

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
         templates: {
            item: Spice.brainy_quote.brainy_quote,
            detail: Spice.brainy_quote.brainy_quote
        },
	 
    });
}
