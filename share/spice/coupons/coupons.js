(function (env) {
    "use strict";

    var locales = {
        DE: {
            validUntil: 'Ablaufdatum: ',
            unknown: 'unbekannt'
        },
        FR: {
            validUntil: 'Valable jusqu\'au: ',
            unknown: 'inconnue'
        },
        ES: {
            validUntil: 'Válido hasta: ',
            unknown: 'desconocido'
        },
        IT: {
            validUntil: 'Valido sino al: ',
            unknown: 'sconosciuto'
        },
        PL: {
            validUntil: 'Ważny do: ',
            unknown: 'odwołania'
        },
        SV: {
            validUntil: 'Giltig t.o.m. ',
            unknown: 'okänt'
        },
        DA: {
            validUntil: 'Gyldig til: ',
            unknown: 'ukendt'
        },
        FI: {
            validUntil: 'Voimassa: ',
            unknown: 'tuntematon'
        }
    };
    env.ddg_spice_coupons = function (api_result) {
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('coupons');
        }

        //For addidtional safety, verify that the locale exists.
        if (!locales[api_result.result.locale]) {
            return Spice.failed('coupons');
        }

        //set translations
        var locale_data = locales[api_result.result.locale];

        // Render the response
        DDG.require('moment.js', function () {
            Spice.add({
                id: "coupons",
                // Customize these properties
                //name: locale_data.tabname,
                data: api_result.items,
                meta: {
                    sourceName: api_result.result.sitename,
                    sourceUrl: api_result.result.homeurl
                },
                normalize: function (item) {
                    return {
                        title: item.title,
                        description: item.date && item.date.expires ? locale_data.validUntil + moment(item.date.expires.timestamp * 1000).format('L') : locale_data.validUntil + locale_data.unknown,
                        url: api_result.result.homeurl,
                        image: api_result.result.cdnurl + '/storage/shops/' + item.parent.alias + '.png'
                    };
                },
                templates: {
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        moreAt: true
                    }
                }
            });
        });
    };
}(this)
        );
