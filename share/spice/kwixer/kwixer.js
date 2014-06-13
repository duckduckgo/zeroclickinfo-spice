(function(env) {
    "use strict";

    // We attach this anonymous function to the global object `env`
    // so that it's accessible everywhere.
    env.ddg_spice_kwixer = function(api_result) {
        // Check if there is anything in the `api_result` before doing anything.
        if(!api_result || !api_result.length === 0) {
            return Spice.failed('kwixer');
        }
        var finalArray=[];
		// Filter out items with bad images or with default images.
        for(var i = 0; i < api_result.length; i++) {
            var item = api_result[i];    
            if(item.ResourceImageUrl && item.ResourceImageUrl.length && (/jpe?g|png/i).test(item.ResourceImageUrl)) {
                finalArray.push(item);
            }
        }
        
        // Check if there's anything in the `finalArray`.
        if(finalArray.length === 0) {
            return Spice.failed('kwixer');
        }

        // Display our Spice.
        Spice.add({
            id: 'kwixer',
            name: 'Movies',
            data: finalArray,
            meta: {
                sourceName: 'Kwixer',
                sourceUrl: "https://www.kwixer.com/#/public?query=" + DDG.get_query_encoded(),
                itemType: "Movies"
            },
            normalize: function(item) {
                return {
                    image: item.ResourceImageUrl,
                    img_m: item.ResourceImageUrl,
                    title: item.ResourceTitle,
                    heading: item.ResourceTitle,
                    ratingText: item.ResourceYear,
                    url: "https://kwixer.com/#/watching/movie/" + item.ResourceId
                }
            },
            templates: {
                group: 'media',
                detail: 'products_item_detail',
                item: 'basic_image_item',
                options: {
                    rating: false,
                    variant: 'poster',
                    buy: Spice.kwixer.buy
                }
            }
        });
        
        // We're going to use this to hide the title of the template.
        // We want the poster to take up the whole tile.
        Spice.getDOM('kwixer').find('.tile__body').hide();
    };
    
    // The separator that we get from the API is `;`, but it looks better with
    // commas.
    Handlebars.registerHelper("formatDetail", function(str) {
        var list = str.split(/;/g);
        
        // We need to make each actor into a link, too, so that we can click on their names.
        for(var i = 0; i < list.length; i++) {
            list[i] = "<a href='/?q=" + encodeURIComponent(list[i]) + "'>" + list[i] + "</a>";
        }
        
        return list.join(", ");
    });
}(this));