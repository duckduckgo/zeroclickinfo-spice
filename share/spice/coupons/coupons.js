(function (env) {
    "use strict";

    var locales = {
        DE: {
            validUntil: 'Ablaufdatum: ',
            unknown: 'unbekannt',
            outUrl: 'http://www.sparheld.de/gutscheine/'
        },
        FR: {
            validUntil: 'Valable jusqu\'au: ',
            unknown: 'inconnue',
            outUrl: 'http://www.reduc.fr/'
        },
        ES: {
            validUntil: 'Válido hasta: ',
            unknown: 'desconocido',
            outUrl: 'http://www.cupones.es/'
        },
        IT: {
            validUntil: 'Valido sino al: ',
            unknown: 'sconosciuto',
            outUrl: 'http://www.signorsconto.it/'
        },
        PL: {
            validUntil: 'Ważny do: ',
            unknown: 'odwołania',
            outUrl: 'http://www.mojekupony.pl/'
        },
        SV: {
            validUntil: 'Giltig t.o.m. ',
            unknown: 'okänt',
            outUrl: 'http://www.rabattkalas.se/'
        },
        DA: {
            validUntil: 'Gyldig til: ',
            unknown: 'ukendt',
            outUrl: 'http://www.rabathelten.dk/'
        },
        FI: {
            validUntil: 'Voimassa: ',
            unknown: 'tuntematon',
            outUrl: 'http://www.alennussankari.fi/'
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
                        url: locale_data.outUrl + '#show=' + item.id,
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
