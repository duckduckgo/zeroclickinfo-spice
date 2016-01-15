(function (env) {
    "use strict";
    
    // From https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
    // Used to decode entities.
    var htmlDecode = (function() {
        var doc = document.implementation.createHTMLDocument('div');
        
        return function(input) {
            doc.documentElement.innerHTML = input;
            return doc.body.textContent;
        };
    }());
    
    // Add a star beside the name if it's an official plugin.
    function officialPlugin(author) {
        if(author === 'Grunt Team') {
            return '★';
        }
        return '';
    }
    
    env.ddg_spice_grunt = function(api_result) {
        
        if (!api_result || !api_result.aaData || !api_result.aaData.length) {
            return Spice.failed('grunt');
        }
        
        // Get the original query sans the trigger words.
        var script = $('[src*="/js/spice/grunt/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/grunt\/([^\/]*)/)[1];
        
        // Return immediately if there is no query.
        // I don't think we'd like to display all the available plugins.
        // Although, I could be wrong.
        if(!query) {
            return Spice.failed('grunt');
        }
        
        // Generate a regexp out of the query.
        // We're going to use this to look for relevant items to display.
        var query_re = new RegExp(query, 'i');
        
        // Cache the regexp for removing the "grunt-" at the beginning of all the names.
        var grunt_re = /^grunt\-/;

        Spice.add({
            id: "grunt",
            name: "Software",
            data: api_result.aaData,
            meta: {
                sourceName: 'Grunt',
                // We can't link to the actual query since filtering is all done on 
                // the front-end as well.
                sourceUrl: 'http://gruntjs.com/plugins'
            },
            normalize: function(item) {
                // Check if the name or description has the query.
                // We do this because we get all of the plugins available,
                // and we have to filter the things we need for ourselves.
                if(!query_re.test(item.name) && !query_re.test(item.ds)) {
                    return;
                }
                
                return {
                    // Remove the "grunt-" at the beginning of plugins.
                    // That's how they're displayed in http://gruntjs.com/plugins
                    title: officialPlugin(item.a) + ' ' + item.name.replace(grunt_re, ''),
                    subtitle: item.a || ' ',
                    description: htmlDecode(item.ds),
                    download_count: DDG.commifyNumber(item.dl),
                    url: 'https://www.npmjs.com/package/' + item.name
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tileTitle: '1line',
                    tileFooter: '2line',
                    tileSnippet: 'small'
                },
                options: {
                    content: Spice.grunt.content,
                    moreAt: true,
                    footer: Spice.grunt.footer
                }
            },
            sort_fields: {
                'official': function(a, b) {
                    // Make sure the official plugins and the ones that have the highest download
                    // go first. This is useful if you want to find reputable plugins.
                    if(a.a === 'Grunt Team' || a.dl > b.dl) {
                        return -1;
                    }
                    return 1;
                }
            },
            sort_default: 'official'
        });
    };
}(this));
