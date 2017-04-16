(function (env) {
    "use strict";
    env.ddg_spice_indian_rail_pnr_status = function(api_result){

        if (api_result.error || !api_result.result) {
            return Spice.failed('indian_rail_pnr_status');
        }

        Spice.add({
            id: "indian_rail_pnr_status",
            name: "PNR Enquiry",
            data: {
                record_data: {
                    "PNR" : api_result.result.pnr,
                    "Train Name" : api_result.result.name,
                    "Current Status" : api_result.result.passengers[0].currentstatus,
                    "From" : api_result.result.from,
                    "To" : api_result.result.to,
                    "Journey Date" : api_result.result.journey,
                    "Class" : api_result.result.cls
                }
            },
            meta: {
                sourceName: "erail.in",
                sourceUrl: 'http://erail.in/indian-railway-pnr-status?pnr=' + api_result.result.pnr
            },
            templates: {
                group: 'base',
                options:{
                    content: 'record',
                    moreAt: true,
                    rowHighlight: true
                }
            }
        });
    };
}(this));
