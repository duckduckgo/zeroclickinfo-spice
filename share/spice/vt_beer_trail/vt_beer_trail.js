(function (env) {
    "use strict";
    
    env.ddg_spice_vt_beer_trail = function(api_result) {
        
        // Validate the response 
        if (!api_result || api_result.length === 0) {
            return Spice.failed('vt_beer_trail');
        }
        
//         var brewerLocation = function location(item) {
//             return item.city + ',' + item.statestate;
//         };
        
        // Render the response
        Spice.add({
            
            id: "vt_beer_trail",
            name: "VT Beer Trail",
            data: api_result,
            meta: {
                sourceName: "VT Beer Trail",
                sourceUrl: 'http://www.vtbeertrail.com',
                sourceIcon: true,
//                 sourceIconUrl: DDG.get_asset_path('vt_beer_trail','vtbeertrail.com.ico'),
                searchTerm: 'Vermont',
                itemType: 'Breweries'
                
            },
            normalize: function(item) {
                return {
                    image: 'http://vtbeertrail.com/' + item.vba100,
                    title: item.name,
                    description: item.city + ', ' + item.state
                };
            },
            templates: {
                group: 'info',
                //item: 'basic_image_item', //Spice.vt_beer_trail.vt_beer_trail_item references custom template vt_beer_trail_item.handlebars
                //item_mobile - optional for devices
                //detail: 'basic_info_detail', //Spice.vt_beer_trail.vt_beer_trail_detail references custom template vt_beer_trail_detail.handlebars
                //detail_mobile - optional for devices
                options: {
                    description: true,
                    moreAt: true,
                    aux: false,
                    rating: false,
                    rating_text: false
                }
            }
        });
    };
}(this));