(function (env) {
    "use strict";

    env.ddg_spice_can_iuse = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('can_iuse');
        }

        //parse the query for name of feature to be shown
        var query  = DDG.get_query(),
            result = query.match(/css[2-3]?|html5|svg|js api/g),

            //get relevant array from the return JSON object
            statuses      = api_result['statuses'],
            data          = api_result['data'],
            browsers      = api_result['agents'],
            required_data = [];

        //pick only the required features
        for( var feature in data ) {
            var obj = data[feature];

            for(var search_term in result) {
                if( obj['categories'].indexOf(result[search_term].toUpperCase()) != -1) {
                    required_data.push(obj);
                    break;
                }
            }
        }

        //sort by usage percentage, since there are many features
        required_data.sort(function(a,b) {
            return b.usage_perc_y - a.usage_perc_y;
        });
        
        // Render the response
        Spice.add({
            id: 'can_iuse',

            // Customize these properties
            name: 'Can I Use',
            data: required_data,
            meta: {
                sourceName: 'caniuse.com',
                sourceUrl: 'http://caniuse.com/'
            },
            normalize: function(item) {

                return {
                    title: item.title,
                    subtitle: item.categories,
                    description: item.description,
                    status: statuses[item.status],
                    info: item.description,
                    usage: item.usage_perc_y,
                    ie: getStatus('ie', item),
                    chrome: getStatus('chrome', item),
                    firefox: getStatus('firefox', item),
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.can_iuse.content,
                    footer: Spice.can_iuse.footer,
                    moreAt: true
                },
                variants: {
                    tileTitle: '2line-small',
                    tileSnippet: 'small',
                    tileFooter: '3line'
                }
            }
        });

        function getStatus(browser_name,item) {
            var current_version = browsers[browser_name]['current_version'];

            if(item.stats[browser_name][current_version] === 'y') {
                return current_version;
            }
        }
    };
}(this));
