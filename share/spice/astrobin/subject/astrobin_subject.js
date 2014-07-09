(function(env) {
    "use strict";

    env.ddg_spice_astrobin_subject = function(api_result) {
        if (!api_result) {
	    return Spice.failed('astrosubject');
        }
    
	Spice.add({
            id: "astrosubject",
            name: "Astrophotography Subject",
            data: api_result.objects,
            meta: {
                itemType: "Astrophotos",
                sourceUrl: 'http://www.astrobin.com',
                sourceName: 'Astrobin'
            },
            normalize: function(item) {
		if(!item.title) {
		    item.title = "M31"
		}
		console.log(item.url_regular);
                return {
		    image: item.url_regular,
                    img_m: item.url_regular,
                    img: item.url_regular,
                    heading: item.title,
		    url: item.url_thumb,
                };
            },
	     templates: {
                group: 'media',
		options: {
			subtitle_content: Spice.astrobin_subject.content,
			buy: Spice.astrobin_subject.buy
		}
            }
	
		
        });
Spice.getDOM('astrosubject').find('.tile__body').addClass('is-hidden');
};
}(this));
