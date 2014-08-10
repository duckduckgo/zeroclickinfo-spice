(function(env) {
    "use strict";

    env.ddg_spice_wgha = function(api_result) {

        if (!(api_result && api_result.length)) {
            return Spice.failed('wgha');
        }

        var query = DDG.get_query();
        var sourceUrl = 'http://www.wasgehtheuteab.de';

        Spice.add({
            id: 'wgha',
            name: 'Events',
            data: api_result,

            meta: {
                sourceUrl: sourceUrl,
                sourceName: 'Was geht heute ab?',
                sourceIcon: true,
                itemType: 'Events'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.wgha.footer
                },
            },
        }
    );
};}(this));
