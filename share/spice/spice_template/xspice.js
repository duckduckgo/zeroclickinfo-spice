function ddg_spice_plugin_name ( api_result ) {
	
	/* Make sure result exists */

	Spice.render({
		
		data: 				api_result,
		header1 : 			' ',
		source_name : 		' ',
		source_url : 		'https:// .com',
		template_normal : 	" ",
		force_big_header : 	true
	});
}

/*******************************
  Private helpers
  *******************************/

  // Private functions here
  function myPrivateFn ( param1, param2 ) {

  }


/*******************************
  Handlebars helpers
  *******************************/

// creates an anchor linking to a result's commments
Handlebars.registerHelper ('helper_name', function() {

	var out;

	/* Logic to build output */
	
	return out;
});