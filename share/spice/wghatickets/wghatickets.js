(function(env) {
    "use strict";

    env.ddg_spice_wghatickets = function(api_result) {

        if (!(api_result && api_result.length)) {
            return Spice.failed('wghatickets');
        }

        var query = DDG.get_query();
        var sourceUrl = 'http://www.wasgehtheuteab.de';

        Spice.add({
            id: 'wghaticktes',
            name: 'Tickets',
            data: api_result,

            meta: {
                sourceUrl: sourceUrl,
                sourceName: 'Was geht heute ab?',
                sourceIcon: true,
                itemType: 'Tickets'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.wghatickets.footer,
                },
                variants: {
                    tileTitle: "3line-small",
                    tileFooter: "3line"
                },
            },
        }
    );
};}(this));
