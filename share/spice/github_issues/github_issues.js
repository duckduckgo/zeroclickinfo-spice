(function (env) {
    "use strict";

    env.ddg_spice_github_issues = function(api_result) {
        
        console.log(api_result);

        if (!api_result || !api_result.meta || api_result.meta.status !== 200 || !api_result.data || !api_result.data.items || !api_result.data.items.length) {
          return Spice.failed('github_issues');
        }

        var results = api_result.data.items,
            script = $('[src*="/js/spice/github_issues/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/github_issues\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);
        
        if (/language:".*?"/.test(unescape(query))) {
            var itemType = "Github Issues (" + unescape(query).match(/language:"(.*?)"/)[1] + ")";
        } else {
            var itemType = "Github Issues";
        }
        
        var templateObj = {};
        var metaObj = { 
            sourceName: 'GitHub',
            searchTerm: decodedQuery,
            itemType: itemType,
            rerender: [ 'description', 'image' ],
            sourceUrl: "https://github.com/search?type=Issues&q=" + encodeURIComponent(query)
        };
        
        templateObj = { 
            group: 'text',
            detail: false,
            item_detail: false,
            options : {
                footer: Spice.github_issues.footer
            },
            variants: {
                tile: 'basic4',
            }
        };
        
        DDG.require("moment.js", function() {
            Spice.add({
                id: 'github_issues',
                name: 'Github Issues',
                data: results,
                meta: metaObj,
                normalize: function(item) {
                    var lastUpdate = moment(item.updated_at).fromNow();
                    var subtitle = item.repository_url.replace('https://api.github.com/repos/', '');
                    var comments;

                    if (item.comments < 2) {
                        comments = item.comments.toString() + ' comment';
                    } else {
                        comments = item.comments.toString() + ' comments';
                    }

                    return {
                        title: item.title.trim(),
                        url: item.html_url,
                        comments: comments,
                        description: item.body.trim(),
                        lastUpdate: lastUpdate,
                        subtitle: subtitle
                    }
                },
                templates: templateObj
            });
        });
    };
}(this));
