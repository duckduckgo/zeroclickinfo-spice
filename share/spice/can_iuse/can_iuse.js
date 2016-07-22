(function (env) {
    'use strict';

    env.ddg_spice_can_iuse = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('can_iuse');
        }

        //parse the query for name of feature to be shown
        var query  = DDG.get_query(),
            result = query.match(/css[2-3]?|html5|svg|js api/ig),

            //get relevant array from the return JSON object
            statuses      = api_result['statuses'],
            data          = api_result['data'],
            browsers      = api_result['agents'],
            supported     = false,
            required_data = [];

        //pick only the required features based on category
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
                supported = false;
                return {
                    title: item.title,
                    subtitle: item.categories,
                    description: item.description,
                    status: statuses[item.status],
                    usage_y: item.usage_perc_y,
                    usage_a: item.usage_perc_a,
                    ie: getStatus('ie', item),
                    chrome: getStatus('chrome', item),
                    firefox: getStatus('firefox', item),
                    android: getStatus('android', item),
                    ios_saf: getStatus('ios_saf', item),
                    supported: supported,
                    ie_stats: getStats('ie',item),
                    chr_stats: getStats('chrome',item),
                    ff_stats: getStats('firefox',item),
                    and_stats: getStats('android', item),
                    saf_stats: getStats('ios_saf', item)
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
                    tileSnippet: 'large',
                    tileFooter: '3line'
                }
            }
        });

        function getStatus(browser_name,item) {
            var current_version = browsers[browser_name]['current_version'];

            if(item.stats[browser_name][current_version] === 'y') {
                supported = true;
                return current_version;
            }
        }

    // y - (Y)es, supported by default
    // a - (A)lmost supported (aka Partial support)
    // n - (N)o support, or disabled by default
    // p - No support, but has (P)olyfill
    // u - Support (u)nknown
    // x - Requires prefi(x) to work
    // d - (D)isabled by default (need to enable flag or something)
    // #n - Where n is a number, starting with 1, corresponds to the notes_by_num note. For example: '42':'y #1'

        function getStats(browser_name, item) {
            var compatibility = item.stats[browser_name],
                supported_versions = {"y":"-", "a":"-"},
                index = 0,
                range,
                versions = Object.keys(compatibility),
                return_value = [];

            versions.sort(function(a,b){
                return b - a;
            });

            for(index = 0; index < versions.length ; index++) {

                index = addInfo(compatibility, versions, index, 'y', supported_versions);
                index = addInfo(compatibility, versions, index, 'a', supported_versions);
            }

            return supported_versions;
        }

        function getRange(versions) {
            versions.sort(function(a,b) {
               return a - b;
            });
            if(versions[0] == null) {
                return ' - ';
            } else if(versions[0] == versions[versions.length - 1]) {
                return 'v ' + versions[0];
            }
            return 'v ' + versions[0] + ' - ' + versions[versions.length - 1];
        }

        function removeHyphen(versions, compatibility, index) {

            var split_v = versions[index].split('-'),
                support_value = compatibility[versions[index]],
                old_version = versions[index];

            versions.splice(index, 1, split_v[0], split_v[1]);
            compatibility[split_v[0]] = support_value;
            compatibility[split_v[1]] = support_value;

            delete compatibility[old_version];
        }

        function addInfo(compatibility, versions, index, support_type, supported_versions) {
            if(compatibility[versions[index]] != support_type) {
                return;
            }

            var compatibility_info = [];

            while(compatibility[versions[index]] === support_type) {
                if(versions[index].indexOf('-') != -1) {
                    removeHyphen(versions, compatibility, index);
                }
                compatibility_info.push(versions[index]);
                index++;
            }
            var range = getRange(compatibility_info);
            supported_versions[support_type] = range;

            return index;   //return how much we have advanced in the array
        }
    };
}(this));
