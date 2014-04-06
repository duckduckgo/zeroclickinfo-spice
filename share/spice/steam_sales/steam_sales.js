function ddg_spice_steam_sales(api_result) {
    "use strict"

    if (!api_result) {
        return;
    }
	 
    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i].name == v) return true;
        }
        return false;
    };

    var results = [];
    for(var i = 0; i < api_result.large_capsules.length; i++) {
        if(api_result.large_capsules[i].discounted != false) { 
	    results.push(api_result.large_capsules[i]);
	}
    }
    for(var i = 0; i < api_result.featured_win.length; i++) {
	if((api_result.featured_win[i].discounted != false) && !(results.contains(api_result.featured_win[i].name))) {
	    results.push(api_result.featured_win[i]);
	}
    }
    for(var i = 0; i < api_result.featured_mac.length; i++) {
	if((api_result.featured_mac[i].discounted != false) && !(results.contains(api_result.featured_mac[i].name))) {
	    results.push(api_result.featured_mac[i]);
	}
    }

    Spice.render({
        data              : results,
	source_name       : "Official Steam Store",
	source_url        : "http://store.steampowered.com",
	spice_name        : 'steam_sales',
	template_frame    : "carousel",
	header1           : "Steam Game Offers",
	template_options  : {
	    items: results,
	    template_item: 'steam_sales',
	    template_detail: 'steam_sales_details',
	    li_height:  90,
	},
	force_no_fold     : true,
	force_big_header  : true
    });
};

Handlebars.registerHelper('conv', function(cents) {
    var dollars = cents/100;
    return dollars;
});
