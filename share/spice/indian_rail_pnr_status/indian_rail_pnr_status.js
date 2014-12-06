(function (env) {
    "use strict";
    env.ddg_spice_indian_rail_pnr_status = function(api_result){

        if (api_result.error) {
            return Spice.failed('indian_rail_pnr_status');
        }

        Spice.add({
            id: "indian_rail_pnr_status",
            name: "PNR Enquiry",
            data: api_result,
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
