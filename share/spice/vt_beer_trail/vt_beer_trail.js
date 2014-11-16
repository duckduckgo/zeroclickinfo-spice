(function (env) {
    "use strict";
    
    env.ddg_spice_vt_beer_trail = function(api_result) {
        
        // Validate the response 
        if (!api_result || !api_result.length) {
            return Spice.failed('vt_beer_trail');
        }
        
        // Render the response
        Spice.add({
            
            id: "vt_beer_trail",
            name: "VT Beer Trail",
            data: api_result,
            
            meta: {
                sourceName: "VT Beer Trail",
                sourceUrl: 'http://www.vtbeertrail.com',
                sourceIconUrl: DDG.get_asset_path('vt_beer_trail','vt_beer_trail.com.ico'),
                searchTerm: 'Vermont',
                itemType: 'Breweries'
                
            },
            
            normalize: function(item) {
                return {
                    image: 'http://vtbeertrail.com/' + item.vba100,
                    title: item.name,
                    description: item.city + ', ' + item.state,
                    faceIcon: 'http://vtbeertrail.com/images/social/facebook.png',
                    twitIcon: 'http://vtbeertrail.com/images/social/twitter.png',
                    googleIcon: 'http://vtbeertrail.com/images/social/google.png',
                    urlIcon: 'http://vtbeertrail.com/images/social/site.png',
                };
            },
            
            sort_fields: {
                brewer: function(a,b) {
                    return (a.selector < b.selector) ? -1 : 1;
                }
            },
            sort_default: 'brewer',
            
            templates: {
                group: 'info',
                //item: 'basic_image_item', //Spice.vt_beer_trail.vt_beer_trail_item references custom template vt_beer_trail_item.handlebars
                //item_mobile - optional for devices
                detail: Spice.vt_beer_trail.vt_beer_trail_detail, //aka: vt_beer_trail_detail.handlebars
                //detail_mobile - optional for devices
                options: {
                    description: true,
                    moreAt: true,
                    aux: false,
                    rating: false,
                    rating_text: false
                }
            },
            onItemSelected: function(item) {
                var lat = item.latitude;
                var lon = item.longitude;
                console.log(lat,lon);
            }
        }); //end add
        
        //generates display:none for rating element in tiles, which despite setting false still exists
        var $dom = Spice.getDOM('vt_beer_trail');
        if ($dom && $dom.length) {
            $dom.find('.tile__tx').hide();
        }
        
    }; //end env
}(this));