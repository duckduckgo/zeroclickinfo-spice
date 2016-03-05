(function(env) {
    "use strict";

    env.ddg_spice_wgha = function(api_result) {

        if (!(api_result && api_result.length)) {
            return Spice.failed('wgha');
        }

        var query = DDG.get_query();
        var sourceUrl = 'https://www.wasgehtheuteab.de';

        Spice.add({
            id: 'wgha',
            name: 'Party',
            data: api_result,

            meta: {
                sourceUrl: sourceUrl,
                sourceName: 'Was geht heute ab?',
                sourceIcon: true,
                itemType: 'Party'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.wgha.footer,
                },
                variants: {
                    tileTitle: "3line-small",
                    tileFooter: "3line"
                },
            },
        }
    );
};}(this));
