(function (env) {
    "use strict";

    env.ddg_spice_edrpou = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.length === 0) {
            return Spice.failed('edrpou');
        }

        // Render the response
        Spice.add({
            id: 'edrpou',

            // Customize these properties
            name: 'Ukrainian company',
            data: api_result,
            meta: {
                sourceName: 'edr.data-gov-ua.org',
                sourceUrl: 'https://edr.data-gov-ua.org/organizations/' + api_result[0].edrpou
            },
            normalize: function(item) {
                return {
                    infoboxData: [
                        {
                            heading: item.name || item.officialName
                        },
                        {
                            label: "Address",
                            value: item.address
                        },
                        {
                            label: "Chairman",
                            value: item.mainPerson
                        },
                        {
                            label: "Activity",
                            value: item.occupation
                        },
                        {
                            label: "Status",
                            value: item.status
                        },
                    ],
                    title: item.edrpou + " " +(item.name || item.officialName),
                    description: item.occupation,
                    url: 'https://edr.data-gov-ua.org/organizations/' + item.edrpou
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.edrpou.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
