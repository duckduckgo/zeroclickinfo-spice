(function (env) {
    "use strict";

    // iterate over each distributors
    // to get matching large and medium size images
    function get_images(imagesets) {
        var images = {};

        $.each(imagesets, function(){
            if (!is_mobile && this.large_image && this.medium_image){
                images.large  = DDG.toHTTP(this.large_image.url);
                images.medium = DDG.toHTTP(this.medium_image.url);
                return false;

            // fallback in case we never find a large image
            // or on mobile device
            } else if (this.medium_image){
                images.medium = DDG.toHTTP(this.medium_image.url);
                images.large = images.medium;

            // worst case
            } else if (this.small_image){
                images.medium = DDG.toHTTP(this.small_image.url);
                images.large = images.medium;
            }
        });
        return images;
    }

    env.ddg_spice_octopart = function (api_result) {

        if(!api_result || !api_result.results || api_result.results.length === 0) {
            return Spice.failed('octopart');
        }

        Spice.add({
            id: 'octopart',
            name: 'Parts',
            data: api_result.results,
            signal: 'high',
            meta: {
                itemType: 'Parts',
                sourceName: 'Octopart',
                sourceUrl : 'http://octopart.com/search?q=' + api_result.request.q
            },
         
            normalize: function(item) {
                var items = 0;
                items = item.item; // our item object is wrapped in an "item" property

                var images = get_images(items.imagesets),
                    datasheet = items.datasheets && items.datasheets[0];

                return {
                    brand: items.brand.name,
                    price: items.avg_price_v2[1] + ' $' + items.avg_price_v2[0],
                    img: images.medium,
                    img_m: images.large,
                    url: items.octopart_url,
                    title: items.mpn,
                    heading: items.mpn,
                    abstract: items.short_description,
                    datasheet: datasheet && datasheet.url,
                    market_status: items.market_status_v2.replace(/^\w+: /, '') // strip out "GOOD: " from market_status
                };
            },
            templates: {
                group: 'products',
                options: {
                    rating: false,
                    subtitle_content: Spice.octopart.content,
                    buy: Spice.octopart.buy
                },
                variants: {
                    detail: 'light'
                }
            },
            relevancy: {
                primary: [
                    { required: 'item.short_description' },
                    { required: 'item.octopart_url' },
                    { required: 'item.datasheets' },
                    { required: 'item.imagesets' },
                    { required: 'item.avg_price_v2' },
                ],
            }
        });
    };
})(this);
