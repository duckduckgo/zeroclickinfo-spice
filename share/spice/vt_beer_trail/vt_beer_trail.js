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
                    brewerImageBig: 'http://vtbeertrail.com/' + item.vba200,
                    title: item.name,
                    description: item.city + ', ' + item.state,
                    // Bring in the icons if sprite solution is a no-go
                    // faceIcon: 'http://vtbeertrail.com/images/social/facebook.png',
                    // twitIcon: 'http://vtbeertrail.com/images/social/twitter.png',
                    // googleIcon: 'http://vtbeertrail.com/images/social/google.png',
                    // urlIcon: 'http://vtbeertrail.com/images/social/site.png',
                    //Cheesy Map Solution
                    mapImage: 'http://open.mapquestapi.com/staticmap/v4/getmap?key=Fmjtd%7Cluurn9ut2u%2Caw%3Do5-9wz0qf&center='+ item.latitude + ','+ item.longitude + '&zoom=10&size=400,200&pcenter='+ item.latitude + ','+ item.longitude
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
                detail: Spice.vt_beer_trail.vt_beer_trail_detail, //aka: vt_beer_trail_detail.handlebars
                detail_mobile: Spice.vt_beer_trail.vt_beer_trail_detail_mobile,
                options: {
                    description: true,
                    moreAt: true,
                    aux: false,
                    rating: false,
                    rating_text: false
                }
            }
        }); //end add
        
        //generates display:none for rating element in tiles
        var $dom = Spice.getDOM('vt_beer_trail');
        if ($dom && $dom.length) {
            $dom.find('.tile__tx').addClass('is-hidden');
        }
        
    }; //end env
}(this));