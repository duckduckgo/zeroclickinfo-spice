/* globals Spice, DDG */
(function (env) {
    'use strict';
    env.ddg_spice_hex = function(api_result) {

        if (!api_result || api_result.status === 404 ) {
            return Spice.failed('hex');
        }

        Spice.add({
            id: 'hex',
            name: 'Software',
            data: api_result,
            meta: {
                sourceName: 'Hex.pm',
                sourceUrl: 'https://hex.pm/packages/' + api_result.name
            },
            normalize: function(item) {
                var infoboxData = [
                    {heading: 'Package information:'}
                ];
                
                if (Array.isArray(item.meta.maintainers) && item.meta.maintainers.length > 0) {
                    infoboxData.push({
                        label: (item.meta.maintainers.length > 1) ? 'Maintainers' : 'Maintainer',
                        value: item.meta.maintainers.join(', ')
                    });
                }
                
                if (Array.isArray(item.meta.contributors) && item.meta.contributors.length > 0) {
                    infoboxData.push({
                        label: (item.meta.contributors.length > 1) ? 'Contributors' : 'Contributor',
                        value: item.meta.contributors.join(', ')
                    });
                }
                
                if (Array.isArray(item.meta.licenses) && item.meta.licenses.length > 0) {
                    infoboxData.push({
                        label: (item.meta.licenses.length > 1) ? 'Licenses' : 'License',
                        value: item.meta.licenses.join(', ')
                    });
                }
                
                if (item.downloads.all) {
                    infoboxData.push({
                        label: 'Downloads',
                        value: DDG.commifyNumber(item.downloads.all)
                    });
                }
                
                if (Array.isArray(item.releases)) {
                    infoboxData.push({
                        label: 'Releases',
                        value: item.releases.length
                    });
                }
                
                return {
                    title: item.name + ' ' + item.releases[0].version,
                    url: item.url,
                    subtitle: item.meta.description,
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));