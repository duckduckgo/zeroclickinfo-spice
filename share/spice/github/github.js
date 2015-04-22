(function(env) {
    "use strict";
    env.ddg_spice_github = function(api_result) {

        if (!api_result || !api_result.meta.status === 200) {
          return Spice.failed('github');
        }

        var script = $('[src*="/js/spice/github/"]')[0],
                    source = $(script).attr("src"),
                    query = source.match(/github\/([^\/]+)/)[1];

        if (/language:".*?"/.test(unescape(query))) {
            var itemType = "Git Repositories (" + unescape(query).match(/language:"(.*?)"/)[1] + ")";
        } else {
            var itemType = "Git Repositories";
        }

        var results = api_result.data.items;

        if (!results) {
            return Spice.failed('github');
        }

        // TODO: temp size limit - relevancy block should handle this later
        if (results.length > 30)
            results = results.splice(0,30);

        DDG.require("moment.js", function() {
            Spice.add({
                id: "github",
                name: "Software",
                data: results,
                meta: {
                    itemType: itemType,
                    sourceUrl: 'https://www.github.com/search?q=' +  encodeURIComponent(query),
                    sourceName: 'GitHub'
                },
                templates: {
                        group: 'text',
                        detail: false,
                        item_detail: false,
                        options: {
                            footer: Spice.github.footer
                        },
                        variants: {
                            tile: 'basic4'
                        }
                    },
                normalize: function(item) {
                    return {
                        title: item.name,
                        subtitle: item.owner.login + "/" + item.name,
                        url: item.html_url,
                        pushed_at: moment(item.pushed_at).fromNow()
                    };
                },
                relevancy: {
                    primary: [
                        { key: 'description', match: /.+/, strict: false } // Reject things without a description.
                    ]
                },
                sort_fields: {
                    watchers: function(a, b) {
                        var x = a.watchers;
                        var y = b.watchers;
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                    }
                },
                sort_default: 'watchers'
            });
        });
    }
}(this));
