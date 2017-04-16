(function (env) {
    "use strict";
    env.ddg_spice_apartable_zip_code = function(api_result){

        if (api_result.error) {
            return Spice.failed('apartable_city_state');
        }


    Spice.render({
        data           :  { 'data': api_result },
        header1        : "Apartments",
        source_name    : 'Apartable.com',
        source_url     : 'http://apartable.com',
        template_frame : "carousel",
        spice_name     : "apartable",
        template_options: {
            li_width        : 120,
            li_height       : 105,
            items           : api_result,
            template_frame : "carousel",
            template_item   : "item",
        },
        force_big_header : true
    });
  };
}(this));
