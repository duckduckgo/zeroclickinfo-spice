(function (env) {
    "use strict";
    env.ddg_spice_icon = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.icons || api_result.icons.length == 0) {
            return Spice.failed('icon');
        }

        var script = $('[src*="/js/spice/icon/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/icon\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        // Render the response
        Spice.add({
            id: "icon",

            // Customize these properties
            name: "Icon",
            data: api_result.icons,
            meta: {
                itemType: 'Icons',
                searchTerm: decodedQuery,
                sourceName: "Iconfinder",
                sourceUrl: 'https://www.iconfinder.com/search/?q=' + decodedQuery
            },
            normalize: function(item) {
                if (!item.raster_sizes || item.raster_sizes.length == 0) {
                    return Spice.failed('icon');
                }

                var styles = $.map(item.styles, function(val, i) {
                    return val.name;
                });

                var categories = $.map(item.categories, function(val, i) {
                    return val.name;
                });

                var title = DDG.capitalize(item.tags[0]),
                    tags = item.tags.join(', '),
                    price = 0,
                    currency = 'USD';

                if (item.is_premium) {
                    price = item.prices[0].price;
                    currency = item.prices[0].currency;
                }

                return {
                    icon: get_image(item.raster_sizes, 64),
                    img_m: get_image(item.raster_sizes, 512),
                    title: title,
                    heading: title,
                    subtitle: item.is_premium ? 'Premium' : 'Free',
                    tags: tags,
                    styles: styles.join(', '),
                    categories: categories.join(', '),
                    description: 'Tags: ' + tags,
                    url: 'https://www.iconfinder.com/icons/' + item.icon_id,
                    price: item.is_premium ? currency + ' ' + price : null,
                }
            },
            templates: {
                group: 'icon',
                options: {
                    subtitle_content: Spice.icon.subtitle,
                    buy: Spice.icon.buy,
                    moreAt: true,
                    rating: false,
                },
                variants: {
                    tileSnippet: 'small',
                    tileTitle: '1line'
                }
            }
        });
    };

    env.get_image = function(raster_sizes, size) {
        var thumbnail_url = '';

        for (var i = 0; i < raster_sizes.length; i++) {
            // find the icon with given size and return the first preview url
            if (raster_sizes[i].size == size) {
                thumbnail_url = raster_sizes[i].formats[0].preview_url;
            }
        };

        // if no icon found for given size, return the largest
        if (thumbnail_url === '') {
            thumbnail_url = raster_sizes[raster_sizes.length - 1].formats[0].preview_url;
        }

        return DDG.toHTTP(thumbnail_url);
    };
}(this));
