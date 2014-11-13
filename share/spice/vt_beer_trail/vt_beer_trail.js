(function (env) {
    "use strict";
    
    env.ddg_spice_vt_beer_trail = function(api_result) {
        
        // Validate the response 
        if (!api_result || api_result.length === 0) {
            return Spice.failed('vt_beer_trail');
        }
        
        // Render the response
        Spice.add({
            
            id: "vt_beer_trail",
            name: "VT Beer Trail",
            data: api_result,
            meta: {
                sourceName: "vtbeertrail.com",
                sourceUrl: 'http://www.vtbeertrail.com',
                primaryText: "The Amazing Craft Brewers of Vermont",
                secondaryText: "Discover"
            },
            templates: {
                //Same as group: 'info
                item: 'basic_image_item', //Spice.vt_beer_trail.vt_beer_trail_item references custom template vt_beer_trail_item.handlebars
                //item_mobile - optional for devices
                detail: 'basic_info_detail', //Spice.vt_beer_trail.vt_beer_trail_detail references custom template vt_beer_trail_detail.handlebars
                //detail_mobile - optional for devices
                options: {
                    moreAt: true,
                    aux: false,
                    variant: 'wide'
                }
            },
            sort_default: 'selector'
        });
    };
}(this));