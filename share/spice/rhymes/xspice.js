function ddg_spice_rhymes (api_result) {
	Spice.render({
		data: 				api_result,
		header1 : 			"Spice2 Rhymes",
		source_url : 		'http://dylansserver.com',
		source_name : 		'Rhymes',
		template_normal : 	'rhymes',
		force_big_header : 	true
	});
}
