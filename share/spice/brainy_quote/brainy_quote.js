(function(env) {
    env.ddg_spice_brainy_quote = function(api_result) {
	if(api_result.error) {
	    return;
	}

	Spice.add({
	    id: 'brainy_quote',
	    name: 'Quote',
	    data: api_result,
	    meta: {
		sourceName: 'Brainy Quote',
		sourceUrl: api_result.source_url,
	    },
	    templates: {
		detail: Spice.brainy_quote.item
	    }
	});
    };
}(this));

// function ddg_spice_brainy_quote (api_result) {
//     "use strict";

//     // Check if the result is a category search or not.
//     // We'll know that if the author is specified in the JSON response.
//     if(api_result.error || api_result.author) {
// 	return;
//     }

//     Spice.add({
//          data              : api_result,
         
//          header1           : api_result.header1,
//          sourceName       : api_result.sourceName, // More at ...
//          sourceUrl        : api_result.sourceUrl,
//          templates: {
//             item: Spice.brainy_quote.brainy_quote,
//             detail: Spice.brainy_quote.brainy_quote
//         },
	 
//     });
// }
