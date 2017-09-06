(function (env) {
    "use strict";

    env.ddg_spice_cookbooks = function(api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed("cookbooks");
        }

        Spice.add({
            id: "cookbooks",
            name: "Software",
            data: api_result,
            meta: {
                sourceName: "cookbook",
            },
            normalize: function(item) {
                var boxData = [{heading: 'Cookbook Information:'}];

                if (item.maintainer) {
                    boxData.push({
                        label: "Author",
                        value: item.maintainer
                    });
                }

                if (item.category) {
                    boxData.push({
                        label: 'Category',
                        value: item.category
                    });
                }

                if (item.source_url) {
                    boxData.push({
                        label: 'Source',
                        value: item.source_url,
                        url: item.source_url
                    });
                }

                if (item.metrics && item.metrics.downloads && item.metrics.downloads.total) {
                    boxData.push({
                        label: 'Downloads',
                        value: item.metrics.download.total
                    });
                }

                if (item.external_url) {
                    boxData.push({
                        label: 'External URL',
                        value: item.external_url,
                        url: item.external_url
                    });
                }

                return {
                    title: item.name,
                    subtitle: item.description,
                    infoboxData: boxData
                }
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
