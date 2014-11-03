(function(env){
    'use strict';

    env.ddg_spice_envato = function(api){
        var has = api.hasOwnProperty('search'),
            fail = !api || !has || (has && !api.search.length);

        if (fail) return Spice.failed('envato');

        var query = DDG.get_query(),
            markets = ['themeforest', 'codecanyon', 'videohive', 'audiojungle', 'graphicriver', '3docean', 'activeden'],
            spice = {
                id: 'envato',
                name: 'Envato Marketplace',
                data: api.search,
                normalize: function(item){
                    var info = item.item_info, 
                        sales_count = 'sale'+(+info.sales == 1 ? '' : 's');

                    return {
                        url: item.url,
                        price: '$'+info.cost.replace('.00', ''),
                        rating: info.rating_decimal,
                        brand: info.user,
                        img: info.thumbnail,
                        heading: item.description,
                        reviewCount: info.sales+' '+sales_count
                    }
                },
                templates: {
                    group: 'products',
                    detail: false,
                    item_detail: false,
                    options: {
                        brand: true,
                        rating: true,
                        price: true
                    }
                }
            },
            marketplace = query.match(markets.join('|'))


        // if audiojungle then switch to audio layout

        if (marketplace && marketplace[0] == 'audiojungle'){
            spice.normalize = function(item){
                var info = item.item_info, duration = 0, x = info.length.split(':')

                switch (x.length){
                    case 1:
                        duration = +x[0]
                        break;
                    case 2:
                        duration = (+x[0] * 60) + +x[1]
                        break;
                    case 3:
                        duration = (+x[0] * 3600) + (+x[1] * 60) + +x[2]
                        break;
                }

                return {
                    user: info.user,
                    rating: info.rating_decimal,
                    sales: item.sales,
                    image: info.thumbnail,
                    duration: duration*1000,
                    title: item.description,
                    url: item.url,
                    streamURL: info.preview_url,
                    price: info.cost.replace('.00', '')
                }
            }

            spice.templates = {
                item_custom: 'audio_item',
                options: {
                    footer: Spice.envato.audio
                }
            }

            spice.view = spice.model = 'Audio'
        }

        Handlebars.registerHelper('formatSales', function(sales){
            return sales+' sale'+(+sales == 1 ? '' : 's');
        });

        Spice.add(spice);
    }

}(this));