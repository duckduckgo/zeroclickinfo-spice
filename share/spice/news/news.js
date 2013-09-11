function ddg_spice_news(api_result) {
    "use strict";

    if(api_result.length === 0) {
	return;
    }

    console.log(api_result);

    var generic = false;
    if((/news/i).test(DDG.get_query())) {
	generic = true;
    }

    Spice.render({
	data: api_result,
	header1: "DuckDuckGo News",
	source_url: api_result[0].url,
	source_name: api_result[0].source,
	template_normal: "news",
	template_frame: "carousel",
	carousel_css_id: "news",
	carousel_items: api_result,
	force_big_header: true,
	force_no_fold: true,
	template_options: {
	    li_width: 640
	}
    });
}
