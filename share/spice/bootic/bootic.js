function ddg_spice_bootic (api_result) {
	"use strict";

	// check for response
	if ($.isEmptyObject(api_result.products)) {
		return;
	}

	var query = (api_result.input_query ) ?
		'?initial=1&q=' + encodeURIComponent( api_result.input_query ) :
		'';

	Spice.render({
		data: api_result,
		source_name : 'Bootic',
		source_url : 'http://www.bootic.com/?q=' + query,
		header1 : api_result.input_query + ' ( Bootic )' ,

		template_frame: "carousel",
		template_normal: "bootic",
		carousel_css_id: "bootic",
		carousel_items: api_result.products,

		force_no_fold : 1,
		force_big_header : 1
	});
}

/*******************************
  Handlebars helpers
  *******************************/

// forms the url for a bootic product image
Handlebars.registerHelper ('picture_url', function() {
	"use strict";

	var pic_id = this.pictures[0],
		url = pic_id.replace(/\d+x\d+/, "60x80");

	return url;
});