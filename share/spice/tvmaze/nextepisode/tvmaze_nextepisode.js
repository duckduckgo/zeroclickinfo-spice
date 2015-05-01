(function (env) {
    "use strict";

    env.ddg_spice_tvmaze_nextepisode = function(api_result){
        if (!api_result || !api_result._embedded) {
            return Spice.failed('tvmaze_nextepisode');
        }

        DDG.require("moment.js", function() {
            Spice.add({
                id: "tvmaze_nextepisode",
                name: "Entertainment",
                data: api_result,
                meta: {
                    sourceName: "TVmaze",
                    sourceUrl: api_result._embedded.nextepisode.url
                },
                relevancy: {
                    primary: [
                        { key: 'name' },
                        { required: '_embedded.nextepisode.name' },
                        { required: '_embedded.nextepisode.airdate' },
                    ]
                },
                normalize: function(item){
                    var infoboxData = [
                        {
                            label: 'Show',
                            value: item.name
                        },
                        {   label: 'Airs',
                            value: moment.parseZone(item._embedded.nextepisode.airstamp).format("MMM Do, YYYY [at] h:mmA")
                        },
                        {
                            label: 'Episode',
                            value: item._embedded.nextepisode.number
                        },
                        {
                            label: 'Season',
                            value: item._embedded.nextepisode.season
                        },
                        {
                            label: 'Show Type',
                            value: item.type
                        },
                        {
                            label: 'Show Status',
                            value: item.status
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
                        title: item._embedded.nextepisode.name,
                        description: DDG.strip_html(item._embedded.nextepisode.summary) || "Episode summary not available.",
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
        });
    };
}(this));
