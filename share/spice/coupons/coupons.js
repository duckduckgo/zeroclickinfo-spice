(function (env) {
    "use strict";
    env.ddg_spice_coupons = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('coupons');
        }

        var tabname, translation_ValidUntil, translation_Unknown;
        switch (api_result.locale) {
            case 'DE':
                tabname = 'Gutscheine';
                translation_ValidUntil = 'Ablaufdatum: ';
                translation_Unknown = 'unbekannt';
                break;
            case 'FR':
                tabname = 'Codes Promo';
                translation_ValidUntil = 'Valable jusqu\'au: ';
                translation_Unknown = 'inconnue';
                break;
            case 'ES':
                tabname = 'Cupones descuento';
                translation_ValidUntil = 'Válido hasta: ';
                translation_Unknown = 'desconocido';
                break;
            case 'IT':
                tabname = 'Codici sconto';
                translation_ValidUntil = 'Valido sino al: ';
                translation_Unknown = 'sconosciuto';
                break;
            case 'PL':
                tabname = 'Kupony rabatowe';
                translation_ValidUntil = 'Ważny do: ';
                translation_Unknown = 'odwołania';
                break;
            case 'SV':
                tabname = 'Rabattkoder';
                translation_ValidUntil = 'Giltig t.o.m. ';
                translation_Unknown = 'okänt';
                break;
            case 'DA':
                tabname = 'Rabatkoder';
                translation_ValidUntil = 'Gyldig til: ';
                translation_Unknown = 'ukendt';
                break;
            case 'FI':
                tabname = 'Alennuskoodit';
                translation_ValidUntil = 'Voimassa: ';
                translation_Unknown = 'tuntematon';
                break;
            default:
                tabname = 'Coupons';
                translation_ValidUntil = 'Valid until: ';
                translation_Unknown = 'unknown';
                break;
        }
        // Render the response
        Spice.add({
            id: "coupons",

            // Customize these properties
            name: tabname,
            data: api_result.items,
            meta: {
                sourceName: api_result.result.sitename,
                sourceUrl: api_result.result.homeurl
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    subtitle: "", 
                    description: item.date && item.date.expires ? translation_ValidUntil + new Date(item.date.expires.timestamp * 1000).toLocaleDateString() : translation_ValidUntil + translation_Unknown ,
                    url: api_result.result.homeurl,
                    image: api_result.result.cdnurl+'/storage/shops/'+item.parent.alias+'.png' 
                };
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.coupons.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
