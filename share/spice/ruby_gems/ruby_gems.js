(function(env) {
    "use strict";
    env.ddg_spice_ruby_gems = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return Spice.failed("ruby_gems");
        }

        // Get the original query.
        var script = $('[src*="/js/spice/ruby_gems/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/ruby_gems\/([^\/]*)/)[1];

        api_result.sort(function(a, b) {
            return a.downloads > b.downloads ? -1 : 1;
        });

        // Display the instant answer.
        Spice.add({
            id: "ruby_gems",
            name: "Software",
            data: api_result,
            meta: {
                sourceUrl: 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query),
                sourceName: 'RubyGems',
                sourceIconUrl: 'http://rubygems.org/favicon.ico',
                total: api_result.length,
                itemType: "gems",
            },
            templates:{
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tile: 'basic1',
                    tileTitle: '1line',
                    tileFooter: '2line',
                    tileSnippet: 'large'
                },
                options: {
                    footer: Spice.ruby_gems.footer
                }
            },
            normalize : function(item){
                var licenses = [];

                if (item.licenses) {
                    var keys = Object.keys(item.licenses);

                    for (var i = 0; i < keys.length; i++) {
                        licenses.push(item.licenses[keys[i]]);
                    };
                }

                return{
                    title: item.name + ' ' + item.version,
                    subtitle: item.authors,
                    url: item.project_uri,
                    description: item.info,
                    licenses: licenses.join(', '),
                    // turns 11872454 to 11,872,454
                    downloads: item.downloads.toLocaleString()
                }
            }
        });
    }
}(this));
