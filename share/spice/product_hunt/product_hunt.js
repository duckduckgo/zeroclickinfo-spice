(function (env) {
    'use strict';
    env.ddg_spice_product_hunt = function(api_result){

        if (!(api_result && api_result.hits && api_result.hits.length > 0)) {
            return Spice.failed('producthunt');
        }

        var qUrl = encodeURIComponent(api_result.query),
            domainRegex = new RegExp(/:\/\/(www\.)?([^\/]+)\/?/),
            baseUrl = "https://producthunt.com";

        function getDomain(url) {
            var match = domainRegex.exec(url);
            if (match && match[2]) {
                return match[2];
            }
            return 'producthunt.com';
        }

        Spice.add({
            id: 'product_hunt',
            name: 'ProductHunt',
            data: api_result.hits,
            meta: {
                searchTerm: api_result.query,
                sourceName: 'ProductHunt',
                sourceIcon: true,
                sourceUrl:  'https://www.producthunt.com/#!/s/posts/' + qUrl
            },
            normalize: function(item) {
                return {
                    id: item.objectId,
                    title: item.name,
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
                    tileTitle: '2line-small',
                    tileFooter: '2line',
                    tileSnippet: 'small'
                },
                detail: false,
                item_detail: false
            }
        });
    };
}(this));
