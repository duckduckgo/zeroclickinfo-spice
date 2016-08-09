(function (env) {
    'use strict';

    env.ddg_spice_caniuse_lists = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('caniuse_lists');
        }

        //parse the query for name of feature to be shown
        var query  = DDG.get_query(),
            result = query.match(/css[2-3]?|html5|svg|js api/ig),

            //get relevant array from the returned JSON object
            statuses      = api_result['statuses'],
            data          = api_result['data'],
            browsers      = api_result['agents'],
            supported     = false,
            supported_d   = false,
            supported_m   = false,
            required_data = [],
            $dom;

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
            id: 'caniuse_lists',
            name: 'Can I Use',
            data: required_data,
            meta: {
                sourceName: 'caniuse.com',
                sourceUrl: 'http://caniuse.com/'
            },
            normalize: function(item) {
                supported   = false;
                supported_d = false;
                supported_m = false;
                return {
                    title      : item.title,
                    subtitle   : item.categories,
                    description: item.description,
                    ie         : getStatus('ie', item, 'd'),
                    chrome     : getStatus('chrome', item, 'd'),
                    firefox    : getStatus('firefox', item, 'd'),
                    safari     : getStatus('safari', item, 'd'),
                    ie_path    : DDG.get_asset_path('caniuse_lists', 'assets/ie-icon-16.png'),
                    chr_path   : DDG.get_asset_path('caniuse_lists', 'assets/chrome-icon-16.png'),
                    ff_path    : DDG.get_asset_path('caniuse_lists', 'assets/firefox-icon-16.png'),
                    and_path   : DDG.get_asset_path('caniuse_lists', 'assets/android-browser-icon-16.png'),
                    saf_path   : DDG.get_asset_path('caniuse_lists', 'assets/ios-safari-icon-16.png')
                };
            },
//             onItemShown: function(item) {
//                 var $dom = $('.zci--caniuse_lists');
//                 if(item.ie == '--') {
//                     $dom.find('.ie').addClass("tx-clr--platinum-dark fade");
//                 }
//             },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.caniuse_lists.footer,
                    moreAt: true
                },
                variants: {
                    tileTitle: '2line-small',
                    tileSnippet: 'large',
                    tileFooter: '3line'
                }
            }
        });

        function getStatus(browser_name,item, type) {
            var compatibility = item.stats[browser_name],
                versions = Object.keys(compatibility),
                index = 0,
                minVersion = '--',
                return_value = [],
                support_type = {'yes': ['y'],'partial': ['a','a x','y x'], 'y': ['y #n'], 'a': ['a #n', 'a x #n']};

            removeHyphen(versions);

            versions.sort(function(a,b) {
                return b - a;
            });

            for(var type in support_type) {
                return_value = findSupportInfo(compatibility, versions, index, type, support_type[type]);
                if(return_value && return_value[2]) {
                    minVersion = return_value[1];
                    break;
                } else if(return_value && !return_value[2]) {
                    index = return_value[0];
                }
            }
            return minVersion;
        }
              
        function findSupportInfo(compatibility, versions, index, type, support_type) {
            var minVersion,
                found = false;

            while(support_type.indexOf(compatibility[versions[index]]) != -1) {
                minVersion = versions[index];
                minVersion += '+';
                found = true;
                index++;
            }
            while(!found && versions[index] && compatibility[versions[index]].match(/([y|a|a x]\s#)+/g)) {
                minVersion = versions[index];
                minVersion += '+*';
                found = true;
                index++;
            }
            if(!found)
                return;
            if(type == 'partial') {
                minVersion += '*';
            }
            return [index, minVersion, found];   //return how much we have advanced in the array
        }
        
        function removeHyphen(versions) {  //separate versions having a range, eg. 4.4.3-4.4.4
            var index = 0,
                split_v;
            
            for(index = 0; index < versions.length; index++) {
                split_v = versions[index].split('-'),
                split_v = removePeriods(split_v);
                if(split_v.length > 1)
                    versions.splice(index, 1, split_v[0], split_v[1]);
                else
                    versions.splice(index, 1, split_v[0]);
            }
        }

        function removePeriods(versions) {  //change version of form x.y.z -> x.y, because it has to be sorted
            var count;
            
            for(count = 0; count < versions.length; count++) {
                var matched = versions[count].match(/\./g);
                if(matched && matched.length >= 2) {
                    versions[count] = versions[count].substr(0, versions[count].indexOf('.',versions[count].indexOf('.')));
                }    
            }
            return versions;
        }
    };
}(this));
