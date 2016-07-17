(function (env) {
    "use strict";

    env.ddg_spice_can_iuse = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('can_iuse');
        }

        var statuses = api_result['statuses'];
        var data = api_result['data']
        var browsers = api_result['agents'];
        
        var required_data = [];               
        
        //pick only the required features
        for( var feature in data ) {
            
            var obj = data[feature];            
            if( obj['categories'].indexOf("CSS") != -1 || obj['categories'].indexOf("CSS2") != -1 || obj['categories'].indexOf("CSS3") != -1) {                
                required_data.push(obj);
            }
        }
        
        //sort by usage percentage, since there are too many features
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
                
                getDescription(item);
                
                return {                    
                    title: item.title,
                    subtitle: item.categories,                                        
                    description: getDescription(item),
                    status: statuses[item.status],
                    info: item.description,
                    usage: item.usage_perc_y
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
                    tileTitle: '1line-large',
                    tileSnippet: 'small'
                }
            }
        });
        
        function getDescription(item) {
            var current_firefox = browsers['firefox']['current_version'],
                current_chrome  = browsers['chrome']['current_version'],
                current_ie      = browsers['ie']['current_version'],
                description;
            
            if(item.stats['firefox'][current_firefox] === 'y') {
                description = 'Firefox: ' + current_firefox;
            }
            if(item.stats['chrome'][current_chrome] === 'y') {
                description += ' Chrome: ' + current_chrome;
            }
            if(item.stats['ie'][current_ie] == 'y') {
                description += ' IE: ' + current_ie;
            } 
            
            return description;
        }
    };
}(this));
