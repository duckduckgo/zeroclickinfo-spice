(function (env) {
    "use strict";

    env.ddg_spice_tvmaze_show = function(api_result){
        if (!api_result.id) {
            return Spice.failed('tvmaze');
        }

        Spice.add({
            id: "tvmaze",
            name: "TV Shows",
            data: api_result,
            meta: {
                sourceName: "TVmaze.com",
                sourceUrl: api_result.url
            },
            normalize: function(item){
                var infoboxData = [
                    {
                        heading: 'Show Information'
                    },
                    {
                        label: 'Show Type',
                        value: item.type
                    },
                    {
                        label: 'Show Status',
                        value: item.status
                    },
                    {
                        label: 'Premiered on',
                        value: item.premiered
                    }
                ];

                if (item.network) {
                    infoboxData.push(
                        {
                            label: 'Network',
                            value: item.network.name
                        },
                        {
                            label: 'Country of origin',
                            value: item.network.country.name
                        }
                    );
                } else if (item.webChannel) {
                    infoboxData.push(
                        {
                            label: 'Web Channel',
                            value: item.webChannel.name
                        }
                    );

                    if (item.webChannel.country) {
                        infoboxData.push(
                            {
                                label: 'Country of origin',
                                value: item.webChannel.country.name
                            }
                        );
                    }
                }

                return {
                    image: item.image ? item.image.medium : null,
                    title: item.name,
                    description: DDG.strip_html(item.summary),
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
