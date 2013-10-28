function ddg_spice_<: $lia_name :> (api_result) {

	// Verify API response contains results
	if (!api_result.length) return;

	// Render spice instant answer
	Spice.render({

		//define Spice.render properties here:
		data              : api_result,
		force_big_header  : true,
		header1           : "Header Text",
		source_name 	  : "Name for More at link",
		source_url        : "http://website.com",
		template_normal   : "<: $lia_name :>"
   });
};
