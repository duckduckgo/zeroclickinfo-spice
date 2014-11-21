(function (env) {
    "use strict";
    env.ddg_spice_color_picker = function(api_result){

        if (api_result.error) {
            return Spice.failed('color_picker');
        }

        Spice.add({
            id: "color_picker",
            name: "ColorPicker",
            data: api_result,
            templates: {
                group: 'base',
                options:{
                    content: Spice.npm.content
                }
            }
        });
    };
}(this));