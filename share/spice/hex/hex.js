/* globals Spice, DDG, moment */
(function(env) {
    'use strict';

    env.ddg_spice_hex = function(api_result) {

        if (!api_result || api_result.status === 404) {
            return Spice.failed('hex');
        }

        DDG.require('moment.js', function() {
            Spice.add({
                id: 'hex',
                name: 'Software',
                data: api_result,
                meta: {
                    sourceName: 'Hex.pm',
                    sourceUrl: 'https://hex.pm/packages/' + api_result.name
                },
                normalize: function(item) {
                    var infoboxData = [{
                        heading: 'Package information:'
                    }];

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

                    if (item.updated_at) {
                        item.updated_at = moment(item.updated_at).fromNow();
                    }

                    item.numberOfLinks = Object.keys(item.meta.links).length;

                    if (item.numberOfLinks > 0) {
                        item.linkLabel = (item.numberOfLinks > 1) ? 'links' : 'link';
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
                        content: Spice.hex.content,
                        moreAt: true
                    }
                }
            });
        });
    };
}(this));