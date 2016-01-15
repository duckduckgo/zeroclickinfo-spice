(function (env) {
    "use strict";
    
    env.ddg_spice_gulp = function(api_result) {
        
        if (!api_result || !api_result.total) {
            return Spice.failed('gulp');
        }

        // Get the original query sans the trigger words.
        var script = $('[src*="/js/spice/gulp/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/gulp\/([^\/]*)/)[1];
        
        var query_re = new RegExp(query, 'i');
        
        DDG.require('moment.js', function() {
            Spice.add({
                id: "gulp",
                name: "Software",
                data: api_result.results,
                meta: {
                    sourceName: 'Gulp',
                    // We can't link to the actual query since filtering is all done on 
                    // the front-end as well.
                    sourceUrl: 'http://gulpjs.com/plugins/'
                },
                normalize: function(item) {
                    item.license = item.license || [];                    
                    
                    // Make sure that the query even exists in the name or description.
                    if(!query_re.test(item.name[0]) && !query_re.test(item.description[0]) && 
                       !query_re.test(item.keywords.toString())) {
                        return;
                    }
                    
                    return {
                        title: item.name[0] + ' ' + item.version[0],
                        subtitle: item.author.join(', ') || ' ',
                        description: item.description[0],
                        url: 'https://www.npmjs.com/package/' + item.name[0],
                        licenses: item.license.join(', ') || '',
                        time: moment(item.modified[0], "YYYYMMDD").fromNow()
                    };
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    variants: {
                        tileTitle: '1line',
                        tileFooter: '2line',
                        tileSnippet: 'large'
                    },
                    options: {
                        moreAt: true,
                        footer: Spice.gulp.footer
                    }
                },
                relevancy: {
                    primary: [
                        { required: 'name.length' },
                        { required: 'version.length' },
                        { required: 'keywords.length' },
                        { required: 'description.length' },
                        { required: 'modified.length' }
                    ]
                }
            });
        });
    };
}(this));
