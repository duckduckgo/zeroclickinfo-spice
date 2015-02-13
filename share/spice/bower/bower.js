(function (env) {
    'use strict';
    env.ddg_spice_bower = function (api_result) {
        if (!api_result || !api_result.length) {
            return Spice.failed('bower');
        }
        var script = $('[src*="/js/spice/bower/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/bower\/([^\/]*)/)[1];
        Spice.add({
            id: 'bower',
            name: 'Software',
            data: api_result,
            meta: {
                sourceName: 'Bower',
                sourceUrl: 'http://bower.io/search?q=' + encodeURIComponent(query),
                itemType: 'packages',
                total: api_result.length
            },
            normalize: function (item) {
                var gh_url = item.url.replace('git://', 'https://');
                
                return {
                    url: gh_url,
                    title: item.name
                };
            },
            templates: {
                group: 'text',
                detail: false
            }
        });
    };
})(this);
