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
};

Handlebars.registerHelper("WGHA_formatDate", function(created_at) {
    var pattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    var match = pattern.exec(created_at);
    if(match != null) {
        var event_date = new Date(match[1], parseInt(match[2])-1, match[3], match[4], match[5], match[6]);
        return event_date.getUTCDate() + "." + (event_date.getUTCMonth() + 1) +
                "." + event_date.getUTCFullYear() +" ab " + event_date.getUTCHours() +
                ":" + (event_date.getMinutes()<10?'0':'') + event_date.getMinutes() + "Uhr";
    } else {return;}
});
}(this));
