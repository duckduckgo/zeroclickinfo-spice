(function (env) {
    "use strict";

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
                    sourceUrl: "http://couprex.com/?s=" + query
                },
                normalize: function(item) {

                    if (!(item.taxonomy_stores && item.taxonomy_stores.length)) {
                        return null;
                    }

                    var company_url = item.custom_fields.clpr_coupon_aff_url[0],
                        descriptionText = DDG.unescape(item.content);

                    // strip protocol, subdomain, and trailing slashes from domain for Clearbit API
                    company_url = company_url.replace(/^(https?:\/\/)?(www\.)?/i, "").replace(/\/.*$/, "");

                    return {
                        title: DDG.unescape(item.title),
                        subtitle: descriptionText,
                        company: item.taxonomy_stores[0].title,
                        image: "http://logo.clearbit.com/" + company_url + "?size=80",
                        url: item.url
                    };
                },
                templates: {
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.couprex.footer,
                        moreAt: true
                    },
                    variants: {
                        tileTitle: '2line-large',
                        tileSubtitle: '2line',
                        tile: 'narrow'
                    },
                    elClass: {
                        tileBody: "text-center"
                    }
                },
                onShow: function(){
                    // workaround to change src to fallback image
                    // in case clearbit API returns nothing
                    $(".tile--couprex img.tile__media__img").on('error', function(){
                        $(this).attr('src', fallback_image);
                    });
                }
            });
        });
    };
}(this));
