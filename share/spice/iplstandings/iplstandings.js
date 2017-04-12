(function (env) {
    "use strict";

    env.onGroupStandings = function(api_result) {
        if (!api_result) {
            return Spice.failed('iplstandings');
        }
        Spice.add({
            id: 'iplstandings',
            name: 'IPL Standings',
            data: api_result, 
            meta: {
                sourceName: 'http://iplt20.com',
                sourceUrl: 'http://iplt20.com/'
            },
            normalize: function(item) {
                return {
                    groups: item.groups[0].standings,
                };
            },

            templates: {
                group: 'list',
                options: {
                    content: Spice.iplstandings.content,
                    moreAt: true,
                }
            }
        });
    };
}(this));
