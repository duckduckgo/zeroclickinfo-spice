(function (env) {
    'use strict';

    var domainRegex = new RegExp(/:\/\/(www\.)?([^\/]+)\/?/);

    function getDomain(url) {
        var match = domainRegex.exec(url);
        if (match && match[2]) {
            return match[2];
        }
        return 'producthunt.com';
    }

    env.ddg_spice_product_hunt = function(api_result){

        if (!(api_result && api_result.hits && api_result.hits.length > 0)) {
            return Spice.failed('product_hunt');
        }

        var query = encodeURIComponent(api_result.query),
            baseUrl = "https://producthunt.com",
            skip = [
                "product",
                "hunt",
                "producthunt"
            ];

        Spice.add({
            id: 'product_hunt',
            name: 'Products',
            data: api_result.hits,
            meta: {
                searchTerm: 'Product' + (api_result.nbHits === 1 ? '' : 's'),
                itemType: 'Products',
                sourceName: 'ProductHunt',
                sourceUrl:  'https://www.producthunt.com/#!/s/posts/' + query
            },
            normalize: function(item) {
                return {
                    id: item.objectId,
                    title: item.name,
                    altSubtitle: item.author.name,
                    url: baseUrl + item.url,
                    description: item.tagline,
                    votes: item.vote_count || 0,
                    comments: item.comment_count || 0,
                    commentsUrl: 'https://www.producthunt.com/posts/' + item.slug,
                    domainName: getDomain(item.url),
                    iconArrowUrl: DDG.get_asset_path('product_hunt','arrow_up.png'),
                };
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.product_hunt.footer
                },
                variants: {
                    tileTitle: '2line',
                    tileSnippet: 'small',
                    tileFooter: '2line'
                },
                detail: false,
                item_detail: false
            },
            relevancy: {
                primary: [{
                    key: "name"
                }]
            }
        });
    };
}(this));
