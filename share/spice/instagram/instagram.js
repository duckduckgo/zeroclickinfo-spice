(function(env) {
    "use strict";
    env.ddg_spice_instagram = function(api_result) {
        if(!api_result || !api_result.html) {
            return Spice.failed('instagram');
        }
        Spice.add({
            id: "instagram",
            name: "Instagram",
            data: api_result,
            templates: {
                group: 'base',
                options: {
                    content: Spice.instagram.content
                }
            }
        });
    };
}(this));