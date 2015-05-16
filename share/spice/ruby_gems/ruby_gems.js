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

        // Display the instant answer.
        Spice.add({
            id: "ruby_gems",
            name: "Software",
            data: api_result,
            meta: {
                sourceUrl: 'https://rubygems.org/search?utf8=✓&query=' + query,
                sourceName: 'RubyGems',
                sourceIconUrl: 'https://rubygems.org/favicon.ico',
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
            sort_fields: {
                downloads: function(a, b) {
                    return a.downloads > b.downloads ? -1 : 1;
                }
            },
            sort_default: 'downloads',
            normalize : function(item){
                var licenses = item.licenses || [];

                return{
                    title: item.name + ' ' + item.version,
                    subtitle: item.authors || " ",
                    url: item.project_uri,
                    description: item.info,
                    licenses: licenses.join(', '),
                    // turns 11872454 to 11,872,454
                    download_count: DDG.commifyNumber(item.downloads)
                }
            }
        });
    }
}(this));
