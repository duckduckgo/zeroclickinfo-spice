function ddg_spice_bootic ( api_result ) {

	// check for response
	if ( $.isEmptyObject(api_result.products) ) return;

	var query = (api_result.input_query ) ?
		'?initial=1&q=' + encodeURIComponent( api_result.input_query ) :
		'';

	var array = [];
	
	$.each(api_result.products, function(key, value){
		array.push(this);
	});

	api_result.products = array;

	Spice.render({
		data: api_result,
		source_name : 'Bootic',
		source_url : 'http://www.bootic.com/?q=' + query,
		header1 : api_result.input_query + ' ( Bootic )' ,
		
		template_frame: "carousel",
		template_normal: "bootic_items",
		carousel_css_id: "bootic",
		carousel_items: api_result.products,
		
		force_no_fold : 1,
		force_big_header : 1,
	});
}

/*******************************
  Handlebars helpers
  *******************************/

// forms the url for a bootic product image
Handlebars.registerHelper ('picture_url', function() {
	var pic_base_uri = 'http://static.bootic.com/_pictures/';
	var pic_id = this.pictures[0];
	return pic_base_uri + pic_id;
});