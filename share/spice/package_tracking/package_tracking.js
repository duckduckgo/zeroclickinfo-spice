(function (env) {
    "use strict";
    env.ddg_spice_package_tracking = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('package_tracking');
        }
        var logo = api_result.c;
        if (logo == 'ups-packages') {
            logo = 'ups';
        }
        Spice.add({
            id: "package_tracking",
            name: "Answer",
            data: {
                title: api_result.status_description,  
                subtitle: api_result.location,
                description: "Last update: " + DDG.getDateFromString(api_result.progress_at),
                image: DDG.get_asset_path('package_tracking', 'logos/' + logo + '.png'),
                infoboxData: [
                    {
                        heading: "Info shipping"
                    },
                    {
                        label: "Shipped at: ",
                        value: api_result.shipped_at != null ? DDG.getDateFromString(api_result.shipped_at) : ""
                    },
                    {
                        label: "Scheduled delivery at: ",
                        value: api_result.est_delivery_at != null ? DDG.getDateFromString(api_result.est_delivery_at) : ""
                    },
                    {
                        label: "Delivery at: ",
                        value:  api_result.act_delivery_at != null ? DDG.getDateFromString(api_result.act_delivery_at) : ""
                    },
                ]
            },
            templates: {
                group: 'info',
            }
        });
    };
}(this));
