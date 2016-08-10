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
            supported     = {'ie': true,'firefox': true,'chrome': true,'safari': true},
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
            id: 'caniuse_lists',
            name: 'Can I Use',
            data: required_data,
            meta: {
                sourceName: 'caniuse.com',
                sourceUrl: 'http://caniuse.com/'
            },
            normalize: function(item) {
                supported = {'ie': true,'firefox': true,'chrome': true,'safari': true};
                return {
                    title      : item.title,
                    subtitle   : item.categories,
                    description: item.description,
                    ie         : getStatus('ie', item),
                    chrome     : getStatus('chrome', item),
                    firefox    : getStatus('firefox', item),
                    safari     : getStatus('safari', item),
                    ie_present : supported['ie'],
                    chrome_present : supported['chrome'],
                    firefox_present : supported['firefox'],
                    safari_present : supported['safari'],
                    ie_path    : DDG.get_asset_path('caniuse_lists', 'assets/ie-icon-16.png'),
                    chr_path   : DDG.get_asset_path('caniuse_lists', 'assets/chrome-icon-16.png'),
                    ff_path    : DDG.get_asset_path('caniuse_lists', 'assets/firefox-icon-16.png'),
                    and_path   : DDG.get_asset_path('caniuse_lists', 'assets/android-browser-icon-16.png'),
                    saf_path   : DDG.get_asset_path('caniuse_lists', 'assets/ios-safari-icon-16.png')
                };
            },
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

        function getStatus(browser_name,item) {
            var compatibility = item.stats[browser_name],
                versions = Object.keys(compatibility),
                index = 0,
                minVersion = '--',
                return_value,
                support_type = {'yes': ['y'],'partial': ['a','a x','y x'], 'y': ['y #n'], 'a': ['a #n', 'a x #n']};

            removeHyphen(versions);

            versions.sort(function(a,b) {   //sort descending
                return b - a;
            });

            for(var type in support_type) {
                return_value = findSupportInfo(compatibility, versions, index, type, support_type[type]);
                if(return_value && return_value['found']) {
                    minVersion = return_value['minVersion'];
                    break;
                } else if(return_value && !return_value['found']) {
                    index = return_value['index'];
                }
            }
            if(minVersion == '--') {
                supported[browser_name] = false;
            }
            return minVersion;
        }
              
        function findSupportInfo(compatibility, versions, index, type, support_type) {
            var minVersion,
                found = false,
                yp_found = false;
            //for support values of yes, partial
            while(support_type.indexOf(compatibility[versions[index]]) != -1) {
                minVersion = versions[index];
                minVersion += '+';
                found = true;
                index++;
                yp_found = true;
            }
            //for support values of the form 'a #n', 'y #n', etc
            while(!yp_found && versions[index] && compatibility[versions[index]].match(/([y|a|a x]\s#)+/g)) {
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
            return {'index': index, 'minVersion': minVersion, 'found': found};   //return how much we have advanced in the array
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
