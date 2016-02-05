(function (env) {
    "use strict";

    // Decode entities
    // Source: https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
    var doc = document.implementation.createHTMLDocument('div');

    function htmlDecode (input) {
        doc.documentElement.innerHTML = input;
        return doc.body.textContent;
    }

    var imgType = (DDG.is_3x || DDG.is_2x) ? "@2x" : "",
        fallback_image = DDG.get_asset_path("couprex", "coupon" + imgType + ".png");

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
                    sourceName: "CoupRex",
                    sourceUrl: "http://couprex.com/?s=" + query,
                    snippetChars: 130
                },
                normalize: function(item) {

                    if (!(item.taxonomy_stores && item.taxonomy_stores.length)) {
                        return null;
                    }

                    var company_url = item.custom_fields.clpr_coupon_aff_url[0].replace(/(https?:\/\/)?www\./, ""),
                        descriptionText = htmlDecode(item.content);

                    return {
                        title: htmlDecode(item.title),
                        subtitle: item.taxonomy_stores[0].title,
                        description: descriptionText,
                        image: "http://logo.clearbit.com/" + company_url + "?size=80",
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
                        tileTitle: '2line-large',
                        tileSnippet: 'small'
                    },
                    elClass: {
                        tileBody: "text-center"
                    }
                },
                onShow: function(){
                    // workaround to set background image to fallback coupon logo
                    // in case clearbit API returns nothing
                    $(".tile--couprex .tile__media__img").each(function(){
                        if ( $(this).height() !== 100 ) {
                            $(this).css({
                                'background-image': 'url(' + fallback_image + ')',
                                'background-repeat': 'no-repeat',
                                'background-position': '50% 0',
                                'height': "100%"
                            });
                        }
                    });
                }
            });
        });
    };
}(this));
