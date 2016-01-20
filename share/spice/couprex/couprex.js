(function (env) {
    "use strict";

    // Decode entities
    // Source: https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
    var doc = document.implementation.createHTMLDocument('div');

    function htmlDecode (input) {
        doc.documentElement.innerHTML = input;
        return doc.body.textContent;
    }

    env.ddg_spice_couprex = function(api_result){

        if (!api_result || api_result.count === 0) {
            return Spice.failed('couprex');
        }

        var script = $('[src*="/js/spice/couprex/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/couprex\/([^\/]+)/)[1]);

        DDG.require('moment.js', function(){
            Spice.add({
                id: "couprex",
                name: "Coupons",
                data: api_result.posts,
                meta: {
                    sourceName: "Couprex",
                    sourceUrl: "http://couprex.com/?s=" + query,
                    snippetChars: 130
                },
                normalize: function(item) {
                    var company_url = item.custom_fields.clpr_coupon_aff_url[0].replace(/(https?:\/\/)?www\./, ""),
                        descriptionText = htmlDecode(item.content);

                    return {
                        title: htmlDecode(item.title),
                        subtitle: item.taxonomy_stores[0].title,
                        description: descriptionText,
                        image: "http://logo.clearbit.com/" + company_url + "?size=100",
                        url: item.url
                    };
                },
                templates: {
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        moreAt: true
                    },
                    variants: {
                        tileTitle: '3line-large',
                        tileSnippet: 'large'
                    },
                    elClass: {
                        tileBody: "text-center"
                    }
                },

                relevancy: {
                    primary: [
                        { required: "custom_fields.clpr_coupon_aff_url" },
                        { required: "title" },
                        { required: "content" }
                    ]
                }
            });
        });
    };
}(this));
