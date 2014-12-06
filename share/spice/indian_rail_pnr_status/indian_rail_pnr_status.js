(function (env) {
    "use strict";
    env.ddg_spice_indian_rail_pnr_status = function(api_result){

        if (api_result.error || !api_result.result) {
            return Spice.failed('indian_rail_pnr_status');
        }

        Spice.add({
            id: "indian_rail_pnr_status",
            name: "PNR Enquiry",
            data: api_result,
            meta: {
                sourceName: "erail.in",
                sourceUrl: 'http://erail.in/indian-railway-pnr-status?pnr=' + api_result.result.pnr
            },
            templates: {
                group: 'text',
                options:{
                    content: Spice.indian_rail_pnr_status.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
