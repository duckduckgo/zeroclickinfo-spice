function ddg_spice_automeme ( api_result ) {
  "use strict";
	
	if (api_result.length) {

		Spice.render({
			data              : {meme : api_result[0]},
			force_big_header  : false,
			source_name       : "Automeme",
			source_url        : 'http://autome.me/',
			template_normal   : 'automeme',
			template_small    : 'automeme'
		});
	}
}
